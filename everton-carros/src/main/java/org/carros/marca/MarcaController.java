package org.carros.marca;

import javax.enterprise.context.ApplicationScoped;
import javax.enterprise.context.RequestScoped;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.WebApplicationException;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

@ApplicationScoped
public class MarcaController {

    public Marca update(Long id, Marca marca) {
        Marca m = Marca.findById(id);
        if (m == null) {
            throw new WebApplicationException("Marca não encontrada. ID: " + id, Response.Status.NOT_FOUND);
        }
        m.setNome(marca.getNome());
        return m;
    }

}