<?php

namespace App\Http\Controllers;

use App\Models\Payement;
use App\Models\Employer;
use App\Models\deduction;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class PayementController extends Controller
{
    public function Payement_all()
    {
        $payement = Payement::with('employer')->get();
        return response()->json(['payement' => $payement]);
    }

    public function add_payement(Request $request)
    {
        $validatedData = $request->validate([
            'amount' => 'required|numeric',
            'payment_date' => 'required|date',
            'employer_id' => 'required|exists:employers,ID_employer',
            'deductions' => 'nullable|array',
            'deductions.*.type' => 'nullable|array',
            'deductions.*.amount' => 'nullable|array',
        ]);

        $employer = Employer::findOrFail($validatedData['employer_id']);
        $salaire_base = $employer->Salaire_base;

        $totalDeductionAmount = 0;

        foreach ($validatedData['deductions'] as $deduction) {
            foreach ($deduction['amount'] as $amount) {
                $totalDeductionAmount += (float) $amount;
            }
        }
        $salaire_base -= $totalDeductionAmount;
        $amount = (int) $validatedData['amount'];

       
        $types = [];
        foreach ($validatedData['deductions'] as $deduction) {
            $types = array_merge($types, $deduction['type']);
        }
        $deduction_string = implode(', ', $types);
        $payment = Payement::create([
            'amount' => $salaire_base,
            'salaire' => $amount,
            'deduction' => $deduction_string,
            'payment_date' => $validatedData['payment_date'],
            'employer_id' => $validatedData['employer_id'],
        ]);

        return response()->json(['payment' => $payment], 201);
    }


    public function Payement_filtre($year, $month)
    {
        $paidEmployerIds = Payement::whereYear('payment_date', $year)
            ->whereMonth('payment_date', $month)
            ->pluck('employer_id')
            ->toArray();

        $unpaidEmployers = Employer::whereNotIn('ID_employer', $paidEmployerIds)
            ->get();

        $selectedEmployerId = request('employerId');
        $selectedEmployerDeductions = DB::table('deduction')
            ->select('deduction.deduction_id', 'deduction.employe_id', 'deduction.deduction_type', 'deduction.deduction_amount', 'deduction.deduction_date', 'deduction.deduction_description', DB::raw('GROUP_CONCAT(type_deductions.type) AS deduction_types'), 'employers.Nom', 'employers.Prenom') // Ajouter les champs de l'employé
            ->leftJoin('type_deductions', 'deduction.deduction_type', 'LIKE', DB::raw("CONCAT('%', type_deductions.id, '%')"))
            ->leftJoin('employers', 'deduction.employe_id', '=', 'employers.ID_employer')
            ->where('deduction.employe_id', $selectedEmployerId)
            ->groupBy('deduction.deduction_id', 'deduction.employe_id', 'deduction.deduction_type', 'deduction.deduction_amount', 'deduction.deduction_date', 'deduction.deduction_description', 'employers.Nom', 'employers.Prenom')
            ->get();

        return response()->json(['unpaidEmployers' => $unpaidEmployers, 'selectedEmployerDeductions' => $selectedEmployerDeductions]);
    }
}
