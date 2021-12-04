<h1 align="center">
    To.do Challenge
</h1>

## :computer: Sobre o desafio

A proposta do desafio era a criação de funcionalidades que permitissem o total funcionamento de uma aplicação para lista de afazeres previamente construída.Utilizando a lógica de programação e manipulação de estados no React JS.

- Adicionar uma nova tarefa
- Remover uma tarefa
- Marcar e desmarcar uma tarefa como concluída


## Lógica para adicionar uma nova tarefa
No momento que o usuário digita um título para a tarefa, ele salva esse título em um estado chamado newTaskTitle. O primeiro passo do algoritmo criado é verificar se o newTaskTitle tem algo digitado, para assim evitar que o usuário crie tarefas sem título na aplicação. O segundo passo foi montar um objeto com as propriedades comuns a qualquer tarefa e em seguida adicionar no estado que armazena um array de tarefas, para isso foi uma função para capturar de forma assíncrona o valor do estado anterior. Após isso, o operador spread foi usado para manter espalhar as tarefas do array antigo no novo array e depois foi adicionada a nova task. Ao final o estado do título é resetado para que seja possível criar um títuo para a tarefa seguinte

<code>

    function handleCreateNewTask() { 
        if(newTaskTitle){
        
        const task = {
            title:newTaskTitle,
            id:generateId(tasks.length),
            isComplete:false
        }

        setTasks((oldState) => [...oldState, task])
        
        setNewTaskTitle('')
        
        }
    }

</code>

## Lógica para alterar o status de uma tarefa

Inicialmente o status isComplete de uma tarefa fica em false, uma vez que quando adicionada ela ainda não foi completada. Com o id da tarefa como argumento, o primeiro passo é percorrer o estado que armazena todas as tarefas, fazendo isso com o map para conseguir retornar o array com alguma alteração. Nesse caso quando o id da task percorrida for igual ao id procurado então será retornado o objeto atual, porém com a propriedade isComplete sobrescrita com a inversão do valor booleano, caso o id não seja o procurado, o objeto é retornado normalmente. Por último o estado que armazena as tarefas é atualizado, com a modificação realizada.

<code>

    function handleToggleTaskCompletion(id: number) { 
        const tasksToggle = tasks.map(task => {
        return task.id === id ? {...task, isComplete:!task.isComplete} : task 
        })
        setTasks(tasksToggle)
  }
  
</code>

## Lógica para remover uma tarefa

Para remover uma tarefa, basta usar o filter para percorrer cada tarefa e identificar as que possui id diferente da tarefa que se deseja excluir, todas com id diferente serão mantidas no array e posteriormente adicionadas ao estado que armazena as tarefas da aplicação.
<code>

    function handleRemoveTask(id: number) {
        const newTasks = tasks.filter(task => task.id !== id )
        setTasks(newTasks)
  }
  
</code>