<?php

namespace App\Mcp\Tools;

use Illuminate\JsonSchema\JsonSchema;
use Laravel\Mcp\Request;
use Laravel\Mcp\Response;
use Laravel\Mcp\Server\Tool;
use Laravel\Mcp\Attributes\Input;

#[Input('description', 'string', 'Description of the todo item', true)]
class CreateTodoTool extends Tool
{
    /**
     * The tool's name.
     */
    protected string $name = 'create-task';
    /**
     * The tool's description.
     */
    protected string $description = 'A description of what this tool does.';

    /**
     * Handle the tool request.
     */
    public function handle(Request $request): Response
    {
        dd($request->all());
        $todo = Todo::create([
            'description' => $input['description'] ?? null,
        ]);

        return [
            'message' => 'Tâche créée avec succès',
            'id' => $todo->id,
            'task' => $todo->description,
        ];
    }

    /**
     * Get the tool's input schema.
     *
     * @return array<string, \Illuminate\JsonSchema\JsonSchema>
     */
    public function schema(JsonSchema $schema): array
    {
        return [
            'description' => $schema->string()
                ->description('The location to get the weather for.')
                ->required(),
        ];
    }
}
