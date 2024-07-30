<?php

namespace App\Http\Controllers;
use App\Models\type_deduction;
use Illuminate\Http\Request;

class Type_Controller extends Controller
{
    public function type_deduction_all(){
        $type = type_deduction::all();
        return response()->json(['type'=> $type]);
    }
}
