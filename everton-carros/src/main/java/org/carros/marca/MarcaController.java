package org.carros.marca;

import org.carros.shared.IController;

import javax.enterprise.context.ApplicationScoped;
import javax.ws.rs.WebApplicationException;
import javax.ws.rs.core.Response;

@ApplicationScoped
public class MarcaController implements IController<Marca> {

    public Marca update(Long id, Marca marca) {
        Marca m = Marca.findById(id);
        if (m == null) {
            throw new WebApplicationException("Marca não encontrada. ID: " + id, Response.Status.NOT_FOUND);
        }
        m.setNome(marca.getNome());
        return marca;
    }

}