<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route; 
use App\Http\Controllers\EmployerController;
use App\Http\Controllers\PayementController;
use App\Http\Controllers\DeductionController;
use App\Http\Controllers\Type_Controller;
use App\Http\Controllers\adminController;


/* 
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
}); 
Route::post('/Login', [adminController::class, 'login']);

// employers
Route::get('/', [EmployerController::class, 'index']);
Route::get('/dashboard', [EmployerController::class, 'dash']);
Route::get('/postes/{id}', [EmployerController::class, 'Poste']);
Route::post('/AjoutEmployer',[EmployerController::class,'Add_employer']);
Route::post('/modif_employer/{id}',[EmployerController::class,'update_employer']);
Route::get('search_employers/', [EmployerController::class,'Search_employers']);
Route::delete('/supprimer_employers/{id}', [EmployerController::class, 'delete_Employers']);

// payemeent 

Route::get('/Table_payement', [PayementController::class, 'Payement_all']);
Route::get('/Filtre_payement/{year}/{month}', [PayementController::class, 'Payement_filtre']);
Route::post('Add_payements',[PayementController::class,'add_payement']);

// deduction

Route::get('/deduction',[DeductionController::class,'Deduction_all']);
Route::get('/Filtre_deduction',[DeductionController::class,'Deduction_Filtre']);
Route::post('/ajoutDeduction',[DeductionController::class,'Deduction_add']);
Route::put('/modiftDeduction/{id}',[DeductionController::class,'Deduction_update']);
Route::delete('supprimer_deduction/{id}', [DeductionController::class,'Supprimer_deduction']);
Route::get('search_deductions/', [DeductionController::class,'Search_deductions']);

// type_deduction

Route::get('/type_deduction',[Type_Controller::class,'type_deduction_all']);
