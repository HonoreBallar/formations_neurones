@extends('master')

@section('content')
    <div class="bg-white p-6 rounded-lg shadow-md max-w-2xl mx-auto">
        <h1 class="text-3xl font-bold text-gray-800 mb-2">Créer une course</h1>
        
        <form action="{{ route('tasks.store') }}" method="POST" class="bg-white p-6 rounded-lg shadow-lg">
            @csrf

            <div class="mb-4">
                <label for="title" class="block text-gray-700 text-sm font-bold mb-2">Titre</label>
                <input type="text"
                    name="title"
                    id="title"
                    class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring focus:border-blue-300"
                    required>
            </div>

            <div class="mb-4">
                <label for="description" class="block text-gray-700 text-sm font-bold mb-2">Description</label>
                <textarea name="description"
                        id="description"
                        rows="4"
                        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring focus:border-blue-300"></textarea>
            </div>

            <div class="mb-4 flex items-center">
                <input type="checkbox"
                    name="is_completed"
                    id="completed"
                    value="1"
                    class="mr-2 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded">
                <label for="completed" class="text-gray-700 font-bold">Terminé</label>
            </div>

            <div class="flex items-center justify-between">
                <button type="submit" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                    Créer la Tâche
                </button>
            </div>
        </form>

        <div class="flex justify-end mt-6">
            <a href="{{ route('tasks.index') }}" class="text-blue-500 hover:text-blue-700 font-medium">
                Retour
            </a>
        </div>
    </div>
@endsection