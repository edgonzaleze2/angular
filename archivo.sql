create table clientes(
    id_clientes serial primary key,
    nombre varchar(150), 
    Direccion varchar(150), 
    telefono int, 
    nit varchar(15), 
    dpi varchar(25) 
);


create table productos (
  id_producto serial primary key, 
  Nombre_producto varchar(150), 
  Descripcion_producto varchar(200), 
  Precio int, 
  Precio_costo int, 
  minimo_stock int
); 

create table factura (
 id_factura serial primary key,
 id_cliente int, 
 Direccion_cliente varchar(150), 
 fecha_emision date
);


CREATE TABLE detalle_factura (
    id_detalle SERIAL PRIMARY KEY,
    id_factura INT REFERENCES factura(id_factura),
    id_producto INT REFERENCES productos(id_producto),
    cantidad INT,
    total_producto NUMERIC(10, 2)
);

CREATE OR REPLACE FUNCTION sp_insertar_cliente(
    _nombre VARCHAR, _direccion VARCHAR, _telefono VARCHAR,
    _nit VARCHAR, _dpi VARCHAR
) RETURNS VOID AS $$
BEGIN
    INSERT INTO clientes(nombre, direccion, telefono, nit, dpi)
    VALUES (_nombre, _direccion, _telefono, _nit, _dpi);
END;

$$ LANGUAGE plpgsql;


CREATE OR REPLACE FUNCTION sp_obtener_clientes()
RETURNS TABLE(id_clientes INT, nombre VARCHAR, direccion VARCHAR, telefono VARCHAR, nit VARCHAR, dpi VARCHAR) AS $$
BEGIN
    RETURN QUERY SELECT * FROM clientes;
END;
$$ LANGUAGE plpgsql;



CREATE OR REPLACE FUNCTION sp_insertar_producto(
    _nombre_producto VARCHAR, _descripcion_producto VARCHAR,
    _precio NUMERIC, _precio_costo NUMERIC, _minimo_stock INT
) RETURNS VOID AS $$
BEGIN
    INSERT INTO productos(nombre_producto, descripcion_producto, precio, precio_costo, minimo_stock)
    VALUES (_nombre_producto, _descripcion_producto, _precio, _precio_costo, _minimo_stock);
END;
$$ LANGUAGE plpgsql;


CREATE OR REPLACE FUNCTION sp_obtener_productos()
RETURNS TABLE(id_producto INT, nombre_producto VARCHAR, descripcion_producto VARCHAR, precio NUMERIC, precio_costo NUMERIC, minimo_stock INT) AS $$
BEGIN
    RETURN QUERY SELECT * FROM productos;
END;
$$ LANGUAGE plpgsql;










