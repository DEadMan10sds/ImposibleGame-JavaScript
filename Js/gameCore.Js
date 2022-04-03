
const matrix_size = 4;
const matrix_cells_amount = matrix_size*matrix_size;
var game_matrix = new Array(matrix_size);
var id_selector = 0;
var gamer_name;
var movements = 0, id_number = 0;
var zero_i, zero_j, zero_id = 0;
var id_celda_actual;
var move_cell_status;

function load_game()
{
    //get_Name();
    set_matrix_values();
    set_matrix_graphic();
    set_data_player();
}

function set_matrix_values()
{
    var aux = 0;
    var random_array_number = new Array(matrix_cells_amount);
    for(i = 0; i < matrix_cells_amount; i++)
        random_array_number[i] = i;
    
    random_array_number = random_array_number.sort(function() {return Math.random() - 0.5});
    for(i = 0; i < matrix_size; i++)
    {
        game_matrix[i] = new Array(matrix_size);
        for(j = 0; j < matrix_size; j++)
        {
            game_matrix[i][j] = random_array_number[aux];
            aux++; 
        }
    }
}

function set_matrix_graphic()
{
    for(i = 0; i < matrix_size; i++)
        for(j = 0; j < matrix_size; j++)
        {
            const cell = document.createElement("div");
            cell.id = id_number;
            const matrix_container = document.querySelector('.contenedor__juego');
            
            if(game_matrix[i][j] > 0)
            {
                cell.classList.add("celda");
                cell.innerHTML = game_matrix[i][j];
            }
            cell.addEventListener("click", move_cell, false);
            cell.setAttribute("onclick", `move_cell(${id_number++}, ${i}, ${j})`)
            matrix_container.appendChild(cell);
            
        }
    console.log(game_matrix);
}

function move_cell(cell_id, cell_i, cell_j)
{
    search_zero();
    console.log("Id zero" + zero_id);
    // const zero_cell = document.getElementById(zero_id);
    // const cell_moved = document.getElementById(cell_id);
    
    var aux;
    switch(detect_direction(cell_i, cell_j))
    {
        case 1:
            console.log("Arriba");
            
            aux = game_matrix[cell_i][cell_j];
            game_matrix[cell_i][cell_j] = game_matrix[cell_i - 1][cell_j];
            game_matrix[cell_i - 1][cell_j] = aux;

        break;
        case 2:
            console.log("Derecha");
            aux = game_matrix[cell_i][cell_j];
            game_matrix[cell_i][cell_j] = game_matrix[cell_i][cell_j + 1];
            game_matrix[cell_i][cell_j + 1] = aux;
        break;
        case 3:
            console.log("Abajo");
            aux = game_matrix[cell_i][cell_j];
            game_matrix[cell_i][cell_j] = game_matrix[cell_i + 1][cell_j];
            game_matrix[cell_i + 1][cell_j] = aux;
        break;
        case 4:
            console.log("Izq");
            aux = game_matrix[cell_i][cell_j];
            game_matrix[cell_i][cell_j] = game_matrix[cell_i][cell_j - 1];
            game_matrix[cell_i][cell_j - 1] = aux;
        break;
        default:
            break;
    }
    console.log(game_matrix);
    movements++;
    update_matrix_graphic();
    verify_game();
}

function detect_direction(current_i, current_j)
{
     var direction = 0, diff_i, diff_j;
     search_zero();
    
     diff_i = current_i - zero_i;
     diff_j = current_j - zero_j;

     if((Math.abs(diff_i) == 1 && Math.abs(diff_j) == 0) || (Math.abs(diff_i) == 0 && Math.abs(diff_j) == 1))
     {
        if(Math.abs(diff_i) == 1)
        {
            if(diff_i > 0) direction = 1;
            else direction = 3;
        }
        else if(Math.abs(diff_j) == 1)
        {
            if(diff_j > 0) direction = 4;
            else direction = 2;
        }
    }
    return direction;
}

function search_zero()
{
    for(i = 0; i < matrix_size; i++)
    {
        for(j = 0; j < matrix_size; j++)
        {
            if(game_matrix[i][j] == 0)
            {
                zero_i = i;
                zero_j = j;
            }
            else zero_id++;
        }
    } 
}

function seconds()
{
    var n = 0;
    var l = document.getElementById("seconds");
    window.setInterval(function()
    {
        l.innerHTML = n;
        n++;
    }, 1000);
}

function get_Name()
{
    gamer_name = prompt("Ingresa tu nombre porfavor");
    if(gamer_name == null || gamer_name == "")
        gamer_name = "Jugador";
}

function update_matrix_graphic()
{
    var id_aux = 0;
    for(i = 0; i < matrix_size; i ++)
        for(j = 0; j < matrix_size; j++)
        {
            const cell_aux = document.getElementById(id_aux);
            if(game_matrix[i][j] != 0)
            {
                
                cell_aux.innerHTML = game_matrix[i][j];
                cell_aux.classList.add("celda");
            }
            else 
            {
                cell_aux.innerHTML = "";
                cell_aux.classList.remove("celda");
            }
            id_aux ++;
        }
    
    const update_movements = document.getElementById("move");
    update_movements.innerHTML = "Movimientos: " + movements/2;
}

function set_data_player()
{
    const aux = document.querySelector('.contenedor_datos');
    const datos = document.createElement("div");
    const movimientos = document.createElement("div");

    datos.classList.add("datos");
    datos.innerHTML = "Jugador: " + gamer_name;
    movimientos.classList.add("datos");
    movimientos.setAttribute("id", "move");
    movimientos.innerHTML = "Movimientos: " + movements;
    aux.appendChild(datos);
    aux.appendChild(movimientos);
}

function verify_game()
{
    var estado = false;
    var correct_elements = 0, recorrido_correcto = 0;
    var arr_correcto = new Array(matrix_size*matrix_size);
    for(i = 0; i < (matrix_size*matrix_size)-1; i++)
        arr_correcto[i] = (i+1);
    arr_correcto.push(0);

    console.log(arr_correcto);

    for(i = 0; i < matrix_size; i++)
        for(j = 0; j < matrix_size; j++)
            if(game_matrix[i][j] == arr_correcto[recorrido_correcto++])
            {
                correct_elements = true;
                
            }
            else 
            {
                correct_elements = false;
                break;
                
            }

    if(correct_elements == true)
        console.log("Exito");
    else 
        console.log("Sigue jugando");
}