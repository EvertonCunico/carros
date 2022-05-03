package org.carros.marca;

import javax.inject.Inject;
import javax.transaction.Transactional;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.util.List;

@Path("/marcas")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class MarcaResource {

    @Inject
    private MarcaController controller;

    @GET
    public List<Marca> listarTodos() {
        return Marca.listAll();
    }

    @POST
    @Transactional
    public Response incluir(Marca marca) {
        Marca.persist(marca);
        return Response.ok(marca).status(201).  build();
    }

    @PUT
    @Path("{id}")
    @Transactional
    public Response atualizar(@PathParam("id") Long id, Marca marca) {
        Marca m = controller.update(id, marca);
        return Response.ok(marca).build();
    }

    @DELETE
    @Path("{id}")
    @Transactional
    public Response excluir(@PathParam("id") Long id) {
        Marca marca = Marca.findById(id);

        if (marca == null) {
            throw new WebApplicationException("Marca não encontrada.", Response.Status.NOT_FOUND);
        }

        marca.delete();
        return Response.status(204).build();
    }

}