@extends('master')

@section('content')
    <div class="container mx-auto p-4 max-w-2xl mx-auto">
        <h1 class="text-3xl font-bold text-gray-800 mb-6">Modifier la tâche</h1>

        @if ($errors->any())
            <div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4" role="alert">
                <strong class="font-bold">Erreur de validation:</strong>
                <ul class="mt-2 list-disc list-inside">
                    @foreach ($errors->all() as $error)
                        <li>{{ $error }}</li>
                    @endforeach
                </ul>
            </div>
        @endif

        <form action="{{ route('tasks.update', $task->id) }}" method="POST" class="bg-white p-6 rounded-lg shadow-md">
            @csrf
            @method('PATCH') {{-- C'est la différence clé : nous utilisons la méthode PATCH --}}

            <div class="mb-4">
                <label for="title" class="block text-gray-700 text-sm font-bold mb-2">Titre</label>
                <input type="text"
                       name="title"
                       id="title"
                       class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring focus:border-blue-300"
                       value="{{ old('title', $task->title) }}"
                       required>
            </div>

            <div class="mb-4">
                <label for="description" class="block text-gray-700 text-sm font-bold mb-2">Description</label>
                <textarea name="description"
                          id="description"
                          rows="4"
                          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring focus:border-blue-300">{{ old('description', $task->description) }}</textarea>
            </div>

            <div class="mb-4 flex items-center">
                <input type="checkbox"
                       name="is_completed"
                       id="completed"
                       value="1"
                       class="mr-2 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                       {{ old('is_completed', $task->is_completed) ? 'checked' : '' }}>
                <label for="completed" class="text-gray-700 font-bold">Tâche Complétée ?</label>
            </div>

            <div class="flex items-center justify-between">
                <button type="submit" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                    Mettre à jour la Tâche
                </button>
            </div>
        </form>
    </div>
@endsection
