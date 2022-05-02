
var matrix_size = 4;
var matrix_cells_amount;
var game_matrix;
var arreglo_caracol;
var id_selector = 0;
var gamer_name;
var movements = 0, id_number = 0;
var zero_i, zero_j, zero_id = 0;
var id_celda_actual;
var move_cell_status;
var n = 0;

function load_game()
{
    get_Name();
    get_size();
    set_matrix_values();
    crear_arreglo_caracol();
    set_matrix_graphic();
    set_data_player();
}

function set_matrix_values()
{
    var aux = 0;
    game_matrix = new Array(matrix_size);
    matrix_cells_amount = matrix_size*matrix_size;
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

function auxfunction()
{
    var repeat = "1fr";
    for(i = 0; i < matrix_size-1; i++)
    {
        repeat = repeat.toString() + " 1fr";
    }
    repeat = repeat.toString();
    repeat = `"${repeat}"`;
    console.log(repeat);
    return repeat;
}

function set_matrix_graphic()
{
    var aux_repeat = auxfunction();
    var aux_size = matrix_size * 11;
    for(i = 0; i < matrix_size; i++)
        for(j = 0; j < matrix_size; j++)
        {
            const cell = document.createElement("div");
            cell.id = id_number;
            const matrix_container = document.querySelector('.contenedor__juego');
            matrix_container.style.width = aux_size.toString() + "rem";
            matrix_container.style.height = aux_size.toString() + "rem";
            matrix_container.classList.add(`s${matrix_size}`);
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
            movements++;
        break;
        case 2:
            console.log("Derecha");
            aux = game_matrix[cell_i][cell_j];
            game_matrix[cell_i][cell_j] = game_matrix[cell_i][cell_j + 1];
            game_matrix[cell_i][cell_j + 1] = aux;
            movements++;
        break;
        case 3:
            console.log("Abajo");
            aux = game_matrix[cell_i][cell_j];
            game_matrix[cell_i][cell_j] = game_matrix[cell_i + 1][cell_j];
            game_matrix[cell_i + 1][cell_j] = aux;
            movements++;
        break;
        case 4:
            console.log("Izq");
            aux = game_matrix[cell_i][cell_j];
            game_matrix[cell_i][cell_j] = game_matrix[cell_i][cell_j - 1];
            game_matrix[cell_i][cell_j - 1] = aux;
            movements++;
        break;
        default:
            break;
    }
    console.log(game_matrix);
    
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

function get_size()
{
    matrix_size = parseInt(prompt("Tamaño del tablero (máximo 10): "));
    if(matrix_size > 10 || matrix_size < 4 || matrix_size == null || matrix_size == "")
        matrix_size = 4;
    /*background.style.gridTemplateColumns = "repeat(" + toString(matrix_size) + ", 1fr);";
    background.style.gridTemplateRows = "repeat" + toString(matrix_size) + ", 1fr;";*/
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
    update_movements.innerHTML = "Movimientos: " + movements;
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
    var estado_lineal = false;
    var arr_correcto = new Array(matrix_size*matrix_size);
    for(i = 0; i < (matrix_cells_amount)-1; i++)
        arr_correcto[i] = (i+1);
    arr_correcto.push(0);

    var aux;
    for(i = 0; i < matrix_size; i++)
    {
        for(j = 0; j < matrix_size; j++)
        {
            if(game_matrix[i][j] != arr_correcto[aux]) 
            {
                estado_lineal = false;
                break;
            }
            else estado_lineal = true;
            aux++;
        }
    }

    var estado_caracol = verificación_Caracol();

    if(estado_lineal || estado_caracol) alert("Ganaste con " + movimientos + "movimientos en " + n + "seegundos");
    else console.log("Sigue jugando");
}

function crear_arreglo_caracol()
{
    var inicio = 0;
    var nlimite = matrix_size-1;
    var c = 1;

    arreglo_caracol = new Array(matrix_size);
    for(i = 0; i < matrix_size; i++)
        arreglo_caracol[i] = new Array(matrix_size);
    
    while(c <= matrix_cells_amount)
    {
        for(x = inicio; x <= nlimite; x++)
        {
            arreglo_caracol[inicio][x] = c;
            c++;
        }
        for(x = inicio + 1; x <= nlimite; x++)
        {
            arreglo_caracol[x][nlimite] = c;
            c++;
        }
        for(x = nlimite -1; x >= inicio; x--)
        {
            arreglo_caracol[nlimite][x] = c;
            c++
        }
        for(x = nlimite-1; x >= inicio + 1; x--)
        {
            arreglo_caracol[x][inicio] = c;
            c++;
        }
        inicio = inicio + 1;
        nlimite = nlimite - 1;
    }
    
    for(i = 0; i < matrix_size; i++)
    {
        for(j = 0; j  < matrix_size; j++)
        {
            if(arreglo_caracol[i][j] == matrix_cells_amount) arreglo_caracol[i][j] = 0;
        }
    }

    console.log(arreglo_caracol);
}

function verificación_Caracol()
{
    console.log(arreglo_caracol);
    var estado = false;
    for(i =0; i < matrix_size; i++)
    {
        for(j =0; j< matrix_size; j++)
        {
            if(game_matrix[i][j] != arreglo_caracol[i][j])
            {
                estado = false;
                break;
            }
            else estado = true;
        }
    }

    return estado;
}