package org.carros.carro;

import javax.enterprise.context.ApplicationScoped;
import javax.ws.rs.WebApplicationException;
import javax.ws.rs.core.Response;

@ApplicationScoped
public class CarroController {

    public Carro update(Long id, Carro carro) {
        Carro c = Carro.findById(id);
        if (c == null) {
            throw new WebApplicationException("Carro não encontrado. ID: " + id, Response.Status.NOT_FOUND);
        }
        c.setAno(carro.getAno());
        c.setCor(carro.getCor());
        c.setMarca(carro.getMarca());
        c.setModelo(carro.getModelo());
        return c;
    }

}