<?php

namespace App\Http\Controllers;

use App\Models\Employer;
use App\Models\departe;
use App\Models\poste;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Log;

class EmployerController extends Controller
{
    public function index()
    {
        $employers = DB::table('employers')
            ->join('departe', 'employers.Departement', '=', 'departe.id')
            ->join('poste', 'employers.Poste', '=', 'poste.id')
            ->select('employers.*', 'departe.nom_departement', 'poste.nom_poste')
            ->get();
        $employers->each(function ($employer) {
            $imagePath = 'employe-images/' . $employer->image;
            $employer->image_url = asset($imagePath);
        });

        $departe = departe::all();

        $count_employers_Ressource = DB::table('employers')
            ->where('Departement', '=', '1')
            ->count();
        $count_employers_finance = DB::table('employers')
            ->where('Departement', '=', '2')
            ->count();
        $count_employers_marketing = DB::table('employers')
            ->where('Departement', '=', '3')
            ->count();
        $count_employers_ventes = DB::table('employers')
            ->where('Departement', '=', '4')
            ->count();

        return response()->json([
            'employers' => $employers,
            'departe' => $departe,
            'count_employers_Ressource' => $count_employers_Ressource,
            'count_employers_finance' => $count_employers_finance,
            'count_employers_marketing' => $count_employers_marketing,
            'count_employers_ventes' => $count_employers_ventes
        ]);
    }

    public function dash()
    {
        $countsEmployer = Employer::count();


        // Récupérer toutes les déductions
        $deductionses = DB::table('deduction')
            ->leftJoin('employers', 'deduction.employe_id', '=', 'employers.ID_employer')
            ->select('deduction.deduction_type', 'employers.ID_employer')
            ->get();

        // Créer un tableau pour compter les occurrences de chaque type de déduction
        $deductionCounts = [];

        foreach ($deductionses as $deduction) {
            $types = explode(',', $deduction->deduction_type);
            foreach ($types as $type) {
                if (!isset($deductionCounts[$type])) {
                    $deductionCounts[$type] = 0;
                }
                $deductionCounts[$type]++;
            }
        }

        // Récupérer les noms des types de déduction et leur count
        $counts = DB::table('type_deductions')
            ->select('id', 'type')
            ->get()
            ->map(function ($type) use ($deductionCounts) {
                return [
                    'deduction_type' => $type->type,
                    'employee_count' => $deductionCounts[$type->id] ?? 0,
                ];
            });

        $deductionSummary = DB::table('deduction')
            ->leftJoin('type_deductions', DB::raw("FIND_IN_SET(type_deductions.id, deduction.deduction_type)"), '>', DB::raw('0'))
            ->select('deduction.deduction_type', 'deduction.deduction_amount', 'type_deductions.id as type_id')
            ->get();

        $deductionData = [];
        $deductionCounts = [];

        foreach ($deductionSummary as $deduction) {
            $types = explode(',', $deduction->deduction_type);
            $amounts = explode(',', $deduction->deduction_amount);

            foreach ($types as $index => $type) {
                $type = trim($type);
                if (isset($amounts[$index])) {
                    $amount = (float) $amounts[$index];
                    if (isset($deductionData[$type])) {
                        $deductionData[$type] += $amount;
                    } else {
                        $deductionData[$type] = $amount;
                    }
                    // Comptage des occurrences de chaque type de déduction
                    if (isset($deductionCounts[$type])) {
                        $deductionCounts[$type]++;
                    } else {
                        $deductionCounts[$type] = 1;
                    }
                }
            }
        }

        $deductionTypes = DB::table('type_deductions')
            ->select('id', 'type')
            ->get();

        $deductions = $deductionTypes->map(function ($type) use ($deductionData, $deductionCounts) {
            return [
                'deduction_type' => $type->type,
                'total_deduction_amount' => $deductionData[$type->id] ?? 0,
                'employee_count' => $deductionCounts[$type->id] ?? 0,
            ];
        })->values();

        $count_employers_Ressource = DB::table('employers')
            ->where('Departement', '=', '1')
            ->count();
        $count_employers_finance = DB::table('employers')
            ->where('Departement', '=', '2')
            ->count();
        $count_employers_marketing = DB::table('employers')
            ->where('Departement', '=', '3')
            ->count();
        $count_employers_ventes = DB::table('employers')
            ->where('Departement', '=', '4')
            ->count();

        return response()->json([
            'counts' => $counts,
            'countsEmployer' => $countsEmployer,
            'deductions' => $deductions,
            'count_employers_Ressource' => $count_employers_Ressource,
            'count_employers_finance' => $count_employers_finance,
            'count_employers_marketing' => $count_employers_marketing,
            'count_employers_ventes' => $count_employers_ventes
        ]);
    }




    public function Poste($id)
    {
        $departe = $id;
        if ($departe == 1) {
            $ids = [1, 2, 3, 4, 5, 6, 7];
            $postes = Poste::whereIn('id', $ids)->get();
            return response()->json(['postes' => $postes]);
        }
        if ($departe == 2) {
            $ids = [8, 9, 10, 11];
            $postes = Poste::whereIn('id', $ids)->get();
            return response()->json(['postes' => $postes]);
        }
        if ($departe == 3) {
            $ids = [12, 13, 14, 15, 16];
            $postes = Poste::whereIn('id', $ids)->get();
            return response()->json(['postes' => $postes]);
        }
        if ($departe == 4) {
            $ids = [17, 18, 19, 20, 21];
            $postes = Poste::whereIn('id', $ids)->get();
            return response()->json(['postes' => $postes]);
        }
    }
    public function Add_employer(Request $request)
    {
        $request->validate([
            'Nom' => 'required|string',
            'Prenom' => 'required|string',
            'Adresse' => 'required|string',
            'Tel' => 'required|numeric',
            'Email' => 'required|email',
            'Date_embauche' => 'required|date|date_format:Y-m-d',
            'Departement' => 'required|string',
            'Poste' => 'required|string',
            'image' => 'required|file|image|mimes:jpeg,png,jpg,gif',
        ]);
        // error_log(print_r($request->all(), true));

        if ($request->hasFile('image')) {
            $extension = $request->file('image')->getClientOriginalExtension();
            $imageName = Str::uuid() . '.' . $extension;
            $Departement = $request->Departement;
            $departement = departe::findOrFail($Departement);
            $salaire = $departement->salaire;
            $request->file('image')->move(public_path('employe-images'), $imageName);
            $employer = new Employer();
            $employer->Nom = $request->Nom;
            $employer->Prenom = $request->Prenom;
            $employer->Adresse = $request->Adresse;
            $employer->Tel = $request->Tel;
            $employer->Email = $request->Email;
            $employer->Date_embauche = $request->Date_embauche;
            $employer->Departement = $request->Departement;
            $employer->Poste = $request->Poste;
            $employer->Salaire_base = $salaire;
            $employer->image = $imageName;

            $employer->save();
            return response()->json(['employe' => $employer], 201);
        } else {
            return response()->json(['message' => 'Image de l\'employé non trouvée'], 400);
        }
    }

    public function update_employer(Request $request, $id)
    {
        // Log la requête brute
        // Log::info('Requête brute:', ['input' => file_get_contents('php://input')]);
        // Log::info('Fichiers:', $request->file());
        // Log::info('Toutes les données:', $request->all());
        // var_dump('vc');return ;
        // Assurez-vous que les données sont correctement récupérées
        Log::info('Nom:', [$request->get('Nom')]);
        Log::info('Prenom:', ['Prenom' => $request->input('Prenom')]);
        Log::info('Adresse:', ['Adresse' => $request->input('Adresse')]);
        Log::info('Tel:', ['Tel' => $request->input('Tel')]);
        Log::info('Email:', ['Email' => $request->input('Email')]);
        Log::info('Date_embauche:', ['Date_embauche' => $request->input('Date_embauche')]);
        Log::info('Departement:', ['Departement' => $request->input('Departement')]);
        Log::info('Poste:', ['Poste' => $request->input('Poste')]);
        Log::info('Image:', ['image' => $request->file('image')]);

        $request->validate([
            'Nom' => 'required|string',
            'Prenom' => 'required|string',
            'Adresse' => 'required|string',
            'Tel' => 'required|numeric',
            'Email' => 'required|email',
            'Date_embauche' => 'required|date|date_format:Y-m-d',
            'Departement' => 'required|string',
            'Poste' => 'required|string',
            'image' => 'nullable|file|image|mimes:jpeg,png,jpg,gif',
        ]);


        error_log(print_r($request->all(), true));

        // $employer = Employer::findOrFail($id);

        // if ($request->hasFile('image')) {
        //     if ($employer->image) {
        //         $oldImagePath = public_path('employe-images/' . $employer->image);
        //         if (file_exists($oldImagePath)) {
        //             unlink($oldImagePath);
        //         }
        //     }

        //     $extension = $request->file('image')->getClientOriginalExtension();
        //     $imageName = Str::uuid() . '.' . $extension;

        //     // Déplacer la nouvelle image
        //     $request->file('image')->move(public_path('employe-images'), $imageName);

        //     $employer->image = $imageName;
        // }

        // // Mettre à jour les autres champs
        // $employer->Nom = $request->Nom;
        // $employer->Prenom = $request->Prenom;
        // $employer->Adresse = $request->Adresse;
        // $employer->Tel = $request->Tel;
        // $employer->Email = $request->Email;
        // $employer->Date_embauche = $request->Date_embauche;
        // $employer->Departement = $request->Departement;
        // $employer->Poste = $request->Poste;
        // $employer->Salaire_base = $request->Salaire_base;
        // // Sauvegarder les changements dans la base de données
        // $employer->save();

        // return response()->json(['employe' => $employer], 200);
    }

    public function delete_Employer($id)
    {
        try {
            $employer = Employer::find($id);
            $employer->delete();
            return response()->json(['message' => 'Employé supprimé avec succès'], 200);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Une erreur s\'est produite lors de la suppression de l\'employé'], 500);
        }
    }

    public function Search_employers(Request $request)
    {
        $search = $request->input('search');
        $employers = Employer::where('Nom', 'LIKE', "%$search%")
            ->get();
        return response()->json($employers);
    }
}
