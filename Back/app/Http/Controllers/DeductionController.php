<?php

namespace App\Http\Controllers;

use App\Models\deduction;
use App\Models\Employer;
use App\Models\type_deduction;

use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;

class DeductionController extends Controller
{
    public function Deduction_all()
    {
        $deduction = DB::table('deduction')
            ->select('deduction.deduction_id', 'deduction.employe_id', 'deduction.deduction_type', 'deduction.deduction_amount', 'deduction.deduction_date', 'deduction.deduction_description', DB::raw('GROUP_CONCAT(type_deductions.type) AS deduction_types'), 'employers.Nom', 'employers.Prenom')
            ->leftJoin('type_deductions', 'deduction.deduction_type', 'LIKE', DB::raw("CONCAT('%', type_deductions.id, '%')"))
            ->leftJoin('employers', 'deduction.employe_id', '=', 'employers.ID_employer')
            ->groupBy('deduction.deduction_id', 'deduction.employe_id', 'deduction.deduction_type', 'deduction.deduction_amount', 'deduction.deduction_date', 'deduction.deduction_description', 'employers.Nom', 'employers.Prenom')
            ->get();

        $type = type_deduction::all();

        $count_deductions = DB::table('deduction')
            ->leftJoin('type_deductions', 'deduction.deduction_type', 'LIKE', DB::raw("CONCAT('%', type_deductions.id, '%')"))
            ->groupBy('deduction.deduction_type')
            ->where('deduction.deduction_type', '=', '1')
            ->count();

        // $count_assurance = DB::table('deduction')
        // ->where('deduction','=','id')
        // ->count();

        return response()->json([
            'deduction' => $deduction,
            'type' => $type,
            'count_deductions' => $count_deductions
        ]);
    }

    public function Deduction_Filtre()
    {
        $Liste_employer_deduction = deduction::pluck('employe_id');

        $Liste_employer_indeduction = Employer::whereNotIn('ID_employer', $Liste_employer_deduction)
            ->get();

        return response()->json(['Liste_employer_indeduction' => $Liste_employer_indeduction]);
    }

    public function Deduction_add(Request $request)
    {
        $validatedData = $request->validate([
            'employe_id' => 'required|exists:employers,ID_employer',
            'deduction_type' => 'required|array',
            'deduction_type.*' => 'exists:type_deductions,id',
            'deduction_date' => 'required|date',
            'deduction_description' => 'required|string'
        ]);

        $deduction_amounts = [];
        foreach ($validatedData['deduction_type'] as $deductionTypeId) {
            $deductionType = type_deduction::find($deductionTypeId);
            if ($deductionType) {
                $deduction_amounts[] = $deductionType->amount;
            }
        }

        $deduction_amounts_string = implode(',', $deduction_amounts);

        $deduction_type_string = implode(',', $validatedData['deduction_type']);

        $deduction = deduction::create([
            'employe_id' => $validatedData['employe_id'],
            'deduction_type' => $deduction_type_string,
            'deduction_date' => $validatedData['deduction_date'],
            'deduction_amount' => $deduction_amounts_string,
            'deduction_description' => $validatedData['deduction_description'],
        ]);
        // return response()->json($deduction_amounts_string, 201);
        return response()->json($deduction, 201);
    }

    public function Search_deductions(Request $request)
    {
        $search = $request->input('search');

        $deductions = deduction::where('deduction_description', 'LIKE', "%$search%")
            ->get();

        return response()->json($deductions);
    }

    public function Deduction_update(Request $request, $id)
    {
        $deduction = deduction::find($id);
        if ($deduction) {
            $validatedData = $request->validate([
                'deduction_type' => 'required|array',
                'deduction_type.*' => 'exists:type_deductions,id',
                // 'deduction_date' => 'required|date',
                'deduction_description' => 'required|string'
            ]);

            $deduction_amounts = [];
            foreach ($validatedData['deduction_type'] as $deductionTypeId) {
                $deductionType = type_deduction::find($deductionTypeId);
                if ($deductionType) {
                    $deduction_amounts[] = $deductionType->amount;
                }
            }
            $deduction_amounts_string = implode(',', $deduction_amounts);
            $String_type = implode(',', $validatedData['deduction_type']);
            $description = $validatedData['deduction_description'];

            $deduction->deduction_type = $String_type;
            $deduction->deduction_amount = $deduction_amounts_string;
            $deduction->deduction_description = $description;
            $deduction->update();

            return response()->json($deduction, 200);
        } else {
            return response()->json(['error' => 'Déduction non trouvée'], 404);
        }
    }

    public function Supprimer_deduction($id)
    {
        $deduction = deduction::find($id);
        $deduction->delete();
    }
}
