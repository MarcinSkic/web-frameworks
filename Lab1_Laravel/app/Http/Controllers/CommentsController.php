<?php

namespace App\Http\Controllers;

use App\Models\Comment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class CommentsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $comments = Comment::orderBy('created_at', 'asc')->get();
        return view("comments", ['comments' => $comments]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $comment = new Comment;
        return view('commentsForm', ['comment' => $comment]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $this->validate($request, [
            'message' => 'required|min:10|max:255',
        ]);
        if (Auth::user() == null) {
            return view("welcome");
        }
        $comment = new Comment();
        $comment->user_id = Auth::user()->id;
        $comment->message = $request->message;
        if ($comment->save()) {
            return redirect("comments");
        }

        return view('comments');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit($id)
    {
        $comment = Comment::find($id);
        //Sprawdzenie czy użytkownik jest autorem komentarza
        if (Auth::user()->id != $comment->user_id) {
            return back()->with([
                'success' => false, 
                'message_type' => 'danger',
                'message' => 'Nie posiadasz uprawnień do przeprowadzenia tej operacji.'
            ]);
        }
        return view('commentsEditForm', ['comment' => $comment]);
    }

    public function update(Request $request, $id)
    {
        $comment = Comment::find($id);
        //Sprawdzenie czy użytkownik jest autorem komentarza
        if (Auth::user()->id != $comment->user_id) {
            return back()->with([
                'success' => false, 
                'message_type' => 'danger',
                'message' => 'Nie posiadasz uprawnień do przeprowadzenia tej operacji.'
            ]);
        }
        $comment->message = $request->message;
        if ($comment->save()) {
            return redirect()->route('comments');
        }
        return "Wystąpił błąd.";
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        //Znajdź komentarz o danych id:
        $comment = Comment::find($id);
        //Sprawdz czy użytkownik jest autorem komentarza:
        if (Auth::user()->id != $comment->user_id) {
            return back();
        }
        if ($comment->delete()) {
            return redirect()->route('comments');
        } else return back();
    }
}
