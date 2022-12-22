// Variables

let nums = document.querySelectorAll('.nums'),
    del = document.querySelector('.del'),
    opc1 = document.querySelector('.operacion1'),
    opc2 = document.querySelector('.operacion2');

let opcs = document.querySelectorAll('.opcs');
let igual = document.querySelector('.igual');

let del2_1 = document.querySelector('.del2.n1'),
    del2_2 = document.querySelector('.del2.n2');

let tabClear = false, op='', coma_=true;

let txt_opc2 = '', txt_opc1 = '';
let numsList = ['1','2', '3', '4', '5', '6', '7', '8', '9', '0'];

let opObtener = [
    {
        'sum': '+', 'rest': '-', 'mul': '*', 'div': '/'
    
    }, {
        '+': (a=0, b=0) => { return +(a) + +(b)}, 
        '-': (a=0, b=0) => { return +(a) - +(b)},
        '*': (a=0, b=1) => { return +(a) * +(b)},
        '/': (a=0, b=1) => { return +(a) / +(b)},
    
    }, {
        '+':'+', '-':'-', '*':'x', '/': '÷'
    }
]

// Funciones

const __fSigno__ = (t, opc=0) => {
    return (opc === 0) ? ( t.replace('*', 'x').replace('/', '÷') 
        ) : t.replace('x', '*').replace('÷', '/')
}

const __getNum__ = (v, num_) => { // Global para reutilizar al hacer click o presionar
    if (txt_opc2.length <= 11) {
        tabClear = true;

        let s = (txt_opc2 == '0') ? '' : txt_opc2; let num = num_;
        if (op !== '' && op !== '<>') { s = ''; op = '<>'; }

        txt_opc2 = s + num;
        opc2.innerHTML = txt_opc2;
    }
}

const __getOperacion__ =  (v, _op_) => { // Igualmente que la anterior
    let s = opc2.innerHTML; num1 = s;
    op = _op_; s += ' ' + op;
    opc1.innerHTML = s;
}

const limpiar = () => { opc2.innerHTML = txt_opc2 = '0'; opc1.innerHTML = '...'; }

const getNumClick = v => __getNum__(v, v.path[0].classList[1].replace('n', '')) // Agregar numeros al click

const getNumPress = e => { // Al presionar un numero y un signo
    tabClear = true;

    if (numsList.indexOf(e.key) != -1) { __getNum__(e, e.key)
    
    } else if (e.key === '=') { getIgual()
    
    } else if ( (e.key === '+' || e.key === '-') || (
        e.key === '*' || e.key === '/') 
    ) {
        __getOperacion__(e, __fSigno__(e.key) );
    }
} 

const getOperacion = v => { // Al presionar un simbolo
    __getOperacion__( v, __fSigno__( opObtener[0][ v.path[0].classList[1].replace('n', '') ] ) )
}

const getIgual = () => { // Al dar click en igual
    num2 = opc2.innerHTML;

    if (tabClear) {
        opc2.innerHTML = eval( opc1.innerHTML + ' ' + num2 );
        opc1.innerHTML += ' ' + num2 + ' =';
    }
}

// Conectar funciones con eventos

del2_1.addEventListener('click', () => {opc2.innerHTML = txt_opc2 = '0'} );

del2_2.addEventListener('click', () => { 
    opc2.innerHTML = txt_opc2 = (opc2.innerHTML.length >= 2) ? opc2.innerHTML.slice(0,-1): '0'
});

del.addEventListener('click', limpiar); // Eliminar

nums.forEach( e => e.addEventListener('click', getNumClick) ); // Agregar numeros al click

document.addEventListener('keypress', getNumPress); // Al presionar un numero y un signo

opcs.forEach( e => e.addEventListener('click', getOperacion) ); // Al presionar un simbolo

igual.addEventListener('click', getIgual); // Al dar click en igual

// De: Francisco Velez
