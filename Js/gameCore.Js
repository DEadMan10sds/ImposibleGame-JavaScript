
const matrix_size = 4;
const matrix_cells_amount = matrix_size*matrix_size;
var game_matrix = new Array(matrix_size);
var id_selector = 0;
var gamer_name;
var movements = 0;
var zero_i, zero_j, zero_id;
var id_celda_actual;
var move_cell_status;

function load_game()
{
    // get_Name();
    set_matrix_values();
    search_zero();
    set_matrix_graphic();
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
    {
        for(j = 0; j < matrix_size; j++)
        {
            const cell = document.createElement("div");
            cell.id = game_matrix[i][j];
            const matrix_container = document.querySelector('.contenedor__juego');
            if(game_matrix[i][j] > 0)
            {
                cell.classList.add("celda");
                cell.textContent = game_matrix[i][j];
            }
            cell.addEventListener("click", move_cell, false);
            cell.setAttribute("onclick", `move_cell(${game_matrix[i][j]}, ${i}, ${j})`)
            matrix_container.appendChild(cell);
            
        }
    }
    console.log(game_matrix);
}

function move_cell(cell_id, cell_i, cell_j)
{
    var zero_cell = document.getElementById("0");
    var cell_to_move = document.getElementById(cell_id);
    movements++;
    if((cell_i == zero_i || cell_j == zero_j) && ((Math.abs(zero_i - cell_i) === 1) || (Math.abs(zero_j-cell_j)==1)))
    {
        game_matrix[zero_i][zero_j] = game_matrix[cell_i][cell_j];
        game_matrix[cell_i][cell_j] = 0;
        zero_cell.textContent = cell_to_move.textContent;
        cell_to_move.textContent = "";
        zero_cell.classList.add("celda");
        cell_to_move.classList.remove("celda");
        zero_cell.setAttribute("id", cell_id);
        cell_to_move.setAttribute("id", "0");
        zero_i = cell_i;
        zero_j = cell_j
    }
    console.log(game_matrix);
    
    // cell.classList.remove("celda");
}

function detect_direction(current_i, current_j)
{

    direction = true;
    // var direction = 0, diff_i, diff_j;

    // console.log("Pressed I: " + current_i + " J: " + current_j);

    // search_zero();
    // console.log("Zero I: " + zero_i + " J: " + zero_j);
    
    // diff_i = current_i - zero_i;
    // diff_j = current_j - zero_j;

    // if((Math.abs(diff_i) == 1 && Math.abs(diff_j) == 0) || (Math.abs(diff_i) == 0 && Math.abs(diff_j) == 1))
    // {
    //     // if(Math.abs(diff_i) == 1)
    //     // {
    //     //     if(diff_i > 0) direction = 1;
    //     //     else direction = 3;
    //     // }
    //     // else if(Math.abs(diff_j) == 1)
    //     // {
    //     //     if(diff_j > 0) direction = 4;
    //     //     else direction = 2;
    //     // }
    //     direction = true;
    // }
    // else direction = false;
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

function movements()
{
    var movement = document.getElementById("movimientos");
    movement.textContent = movements;
}
// function verify_up(current_i, current_j)
// {   
//     if(game_matrix[current_i-1][current_j] == 0)//Arriba
//         return 1;
// }

// function verify_right(current_i, current_j)
// {
//     if(game_matrix[current_i][current_j+1] == 0)//Derecha
//             return 2;
// }

// function verify_down(current_i, current_j)
// {
//     if(game_matrix[current_i+1][current_j ]  ==  0) //Abajo
//             return 3;
// }

// function verify_left(current_i, current_j)
// {
//     if(game_matrix[current_i][current_j-1]  == 0)//Izquierda
//             return 4;
// }