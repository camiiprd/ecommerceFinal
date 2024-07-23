-- MySQL Workbench Synchronization
-- Generated: 2024-06-18 17:13
-- Model: New Model
-- Version: 1.0
-- Project: Name of the project
-- Author: Administrador

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

ALTER SCHEMA ecommerce  DEFAULT CHARACTER SET utf8  DEFAULT COLLATE utf8_general_ci ;

ALTER TABLE ecommerce.login 
DROP FOREIGN KEY fk_login_usuarios1;

ALTER TABLE ecommerce.productos 
DROP FOREIGN KEY fk_productos_categoria1;

ALTER TABLE ecommerce.ventas 
DROP FOREIGN KEY fk_ventas_entrega1,
DROP FOREIGN KEY fk_ventas_formaDePago1;

ALTER TABLE ecommerce.productos_ventas 
DROP FOREIGN KEY fk_productos_has_ventas_productos1,
DROP FOREIGN KEY fk_productos_has_ventas_ventas1;

ALTER TABLE ecommerce.usuarios 
CHARACTER SET = utf8 , COLLATE = utf8_general_ci ,
CHANGE COLUMN email email VARCHAR(320) NULL DEFAULT NULL ,
CHANGE COLUMN username username VARCHAR(45) NOT NULL ,
CHANGE COLUMN password password VARCHAR(45) NOT NULL ;

ALTER TABLE ecommerce.login 
CHARACTER SET = utf8 , COLLATE = utf8_general_ci ;

ALTER TABLE ecommerce.productos 
CHARACTER SET = utf8 , COLLATE = utf8_general_ci ,
DROP COLUMN idcategoria,
ADD COLUMN idcategoria INT(11) NOT NULL AFTER idproveedores,
ADD INDEX fk_productos_categoria1_idx (idcategoria ASC) VISIBLE,
DROP INDEX fk_productos_categoria1_idx ;
ALTER TABLE ecommerce.productos ALTER INDEX PRIMARY VISIBLE;

ALTER TABLE ecommerce.formaDePago 
CHARACTER SET = utf8 , COLLATE = utf8_general_ci ;

ALTER TABLE ecommerce.ventas 
CHARACTER SET = utf8 , COLLATE = utf8_general_ci ;

ALTER TABLE ecommerce.entrega 
CHARACTER SET = utf8 , COLLATE = utf8_general_ci ;

ALTER TABLE ecommerce.categoria 
CHARACTER SET = utf8 , COLLATE = utf8_general_ci ;

ALTER TABLE ecommerce.proveedores 
CHARACTER SET = utf8 , COLLATE = utf8_general_ci ;

ALTER TABLE ecommerce.productos_ventas 
CHARACTER SET = utf8 , COLLATE = utf8_general_ci ;

ALTER TABLE ecommerce.login 
ADD CONSTRAINT fk_login_usuarios1
  FOREIGN KEY (idusuarios)
  REFERENCES ecommerce.usuarios (idusuarios)
  ON DELETE NO ACTION
  ON UPDATE NO ACTION;

ALTER TABLE ecommerce.productos 
DROP FOREIGN KEY fk_productos_proveedores1;

ALTER TABLE ecommerce.productos ADD CONSTRAINT fk_productos_proveedores1
  FOREIGN KEY (idproveedores)
  REFERENCES ecommerce.proveedores (idproveedores)
  ON DELETE NO ACTION
  ON UPDATE NO ACTION,
ADD CONSTRAINT fk_productos_categoria1
  FOREIGN KEY (idcategoria)
  REFERENCES ecommerce.categoria (idcategoria)
  ON DELETE NO ACTION
  ON UPDATE NO ACTION;

ALTER TABLE ecommerce.ventas 
DROP FOREIGN KEY fk_ventas_usuarios1;

ALTER TABLE ecommerce.ventas ADD CONSTRAINT fk_ventas_usuarios1
  FOREIGN KEY (idusuarios)
  REFERENCES ecommerce.usuarios (idusuarios)
  ON DELETE NO ACTION
  ON UPDATE NO ACTION,
ADD CONSTRAINT fk_ventas_entrega1
  FOREIGN KEY (identrega)
  REFERENCES ecommerce.entrega (identrega)
  ON DELETE NO ACTION
  ON UPDATE NO ACTION,
ADD CONSTRAINT fk_ventas_formaDePago1
  FOREIGN KEY (idformaDePago)
  REFERENCES ecommerce.formaDePago (idformaDePago)
  ON DELETE NO ACTION
  ON UPDATE NO ACTION;

ALTER TABLE ecommerce.productos_ventas 
ADD CONSTRAINT fk_productos_has_ventas_productos1
  FOREIGN KEY (productos_idproductos)
  REFERENCES ecommerce.productos (idproductos)
  ON DELETE NO ACTION
  ON UPDATE NO ACTION,
ADD CONSTRAINT fk_productos_has_ventas_ventas1
  FOREIGN KEY (ventas_idventas)
  REFERENCES ecommerce.ventas (idventas)
  ON DELETE NO ACTION
  ON UPDATE NO ACTION;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;