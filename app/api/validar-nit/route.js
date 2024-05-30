import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

async function insertNit(nit, valido, mensaje) {
  const result = await sql`
    INSERT INTO nits (nit, valido, mensaje)
    VALUES (${nit}, ${valido}, ${mensaje})
    RETURNING nit, valido, mensaje;
  `;
  return result.rows[0];
}

function validarNitGuatemala(nit) {  
  var nd, add=0;
	if(nd =  /^(\d+)\-?([\dkK])$/.exec(nit)){
		nd[2] = (nd[2].toLowerCase()=='k')?10:parseInt(nd[2]);
		for (var i = 0; i < nd[1].length; i++) {
			add += ( (((i-nd[1].length)*-1)+1) * nd[1][i] );
		}
		return ((11 - (add % 11)) % 11) == nd[2];
	}else{
		return false;
	}
} 

export async function POST(request) {
  try {
    let { nit } = await request.json();
    let valido = false;
    let mensaje = "";
    let status = 500;
    let newDataEntry = null;
    let regex = /^CF/i;
        
    if (!nit) {
      valido = false;
      status = 400;
      mensaje = "El número de nit es requerido";
    } else if (regex.test(nit)) {
      valido = true;
      status = 200      
      mensaje = "";
      nit = "Consumidor Final";
    } else if (nit.length < 6 ) {
      valido = false;
      status = 400      
      mensaje = "El número de NIT debe tener al menos 6 caracteres";
    } else if (nit.length > 10 ) {
      valido = false;
      status = 400
      mensaje = "El número de NIT no puede tener más de 10 caracteres";
    } else {
      valido = true;
      status = 200;   
      if(validarNitGuatemala(nit)){
        mensaje = "El número de NIT es válido";
      } else {
        mensaje = "El número de NIT es válido para esta prueba pero no para Guatemala";
      }
    }
    newDataEntry = await insertNit(nit, valido, mensaje);

    return NextResponse.json({ valido, mensaje }, { status });      

  } catch(error) { 
    
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export const revalidate = 0;
