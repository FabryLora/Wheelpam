<?php

namespace App\Http\Controllers;

use App\Models\Banner;
use App\Models\Nosotros;
use App\Models\Valores;
use Illuminate\Http\Request;
use Inertia\Inertia;

class NosotrosController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {

        $nosotros = Nosotros::first();

        return Inertia::render('auth/nosotrosAdmin', ['nosotros' => $nosotros]);
    }

    public function indexInicio()
    {
        $nosotros = Nosotros::first();
        $valores = Valores::orderBy('order')->get();
        $banner = Banner::where('name', 'nosotros')->first();

        return Inertia::render('nosotros', [
            'nosotros' => $nosotros,
            'valores' => $valores,
            'banner' => $banner
        ]);
    }

    public function nosotrosBanner()
    {
        $nosotros = Banner::where('name', 'nosotros')->first();

        return Inertia::render('auth/nosotrosBanner', ['nosotros' => $nosotros]);
    }



    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request)
    {
        $nosotros = Nosotros::first();



        // Check if the Nosotros entry exists
        if (!$nosotros) {
            return redirect()->back()->with('error', 'Nosotros not found.');
        }

        $data = $request->validate([
            'title' => 'sometimes|string|max:255',
            'text' => 'sometimes',
            'image' => 'sometimes|file',
            'banner' => 'sometimes|file',
            'video' => 'sometimes|file',
        ]);

        // Handle file upload if image exists
        if ($request->hasFile('image')) {
            // Delete the old image if it exists
            if ($nosotros->image) {
                $absolutePath = public_path('storage/' . $nosotros->image);
                if (file_exists($absolutePath)) {
                    unlink($absolutePath);
                }
            }
            // Store the new image
            $data['image'] = $request->file('image')->store('images', 'public');
        }


        // Handle file upload if video exists
        if ($request->hasFile('video')) {
            // Delete the old video if it exists
            if ($nosotros->video) {
                $absolutePath = public_path('storage/' . $nosotros->video);
                if (file_exists($absolutePath)) {
                    unlink($absolutePath);
                }
            }
            // Store the new video
            $data['video'] = $request->file('video')->store('videos', 'public');
        }

        // Handle file upload if banner exists
        if ($request->hasFile('banner')) {
            // Delete the old banner if it exists
            if ($nosotros->banner) {
                $absolutePath = public_path('storage/' . $nosotros->banner);
                if (file_exists($absolutePath)) {
                    unlink($absolutePath);
                }
            }
            $data['banner'] = $request->file('banner')->store('images', 'public');
        }

        $nosotros->update($data);

        return redirect()->back()->with('success', 'Nosotros updated successfully.');
    }
}
