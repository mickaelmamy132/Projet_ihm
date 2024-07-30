<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Admin;
use Illuminate\Support\Facades\Auth;

class adminController extends Controller
{
    public function login(Request $request)
    {
        $admin = Admin::where('nom', $request->input('nom'))->first();

        if (!$admin) {
            return response()->json(['message' => 'Nom d\'utilisateur ou mot de passe incorrect'], 401);
        }

        if ($admin->mot_de_passe === $request->input('password')) {
            return response()->json(['message' => 'Connexion réussie', 'user' => $admin], 200);
        } else {
            return response()->json(['message' => 'Nom d\'utilisateur ou mot de passe incorrect'], 401);
        }
    }
}
