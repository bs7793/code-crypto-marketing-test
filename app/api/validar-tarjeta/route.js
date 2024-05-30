import { NextResponse } from 'next/server';

function validarTarjeta(numeroTarjeta) {  
  let suma = 0;
  let doblar = false;
  for (let i = numeroTarjeta.length - 1; i >= 0; i--) {
      let digito = parseInt(numeroTarjeta.charAt(i));
      if (isNaN(digito)) {
          return false;
      }
      if (doblar) {
          digito *= 2;
          if (digito > 9) {
              digito -= 9;
          }
      }
      suma += digito;
      doblar = !doblar;
  }
  return (suma % 10) == 0;
} 

export async function POST(request) {
  try {
    let { tarjeta } = await request.json();
    let valido = false;
    let mensaje = "";
    let status = 500;
        
    if (!tarjeta) {
      valido = false;
      status = 400;
      mensaje = "El número de tarjeta es requerido";
    } else if (validarTarjeta(tarjeta)) {
      valido = true;
      status = 200      
      mensaje = "Número de tarjeta de crédito válido";
    } else {
      valido = true;
      status = 400;
      mensaje = "Número de tarjeta de crédito inválido";
    }

    return NextResponse.json({ valido, mensaje }, { status });      

  } catch(error) { 
    console.log(error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export const revalidate = 0;
