package org.carros.carro;

import org.carros.shared.IResource;

import javax.inject.Inject;
import javax.transaction.Transactional;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.util.List;

@Path("/carros")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class CarroResource implements IResource<Carro> {

    @Inject
    private CarroController controller;

    @GET
    public List<Carro> listarTodos() {
        return Carro.listAll();
    }

    @POST
    @Transactional
    public Response incluir(Carro carro) {
        Carro.persist(carro);
        return Response.ok(carro).status(201).build();
    }

    @PUT
    @Path("{id}")
    @Transactional
    public Response atualizar(@PathParam("id") Long id, Carro carro) {
        Carro m = controller.update(id, carro);
        return Response.ok(carro).build();
    }

    @DELETE
    @Path("{id}")
    @Transactional
    public Response excluir(@PathParam("id") Long id) {
        Carro marca = Carro.findById(id);

        if (marca == null) {
            throw new WebApplicationException("Carro não encontrado.", Response.Status.NOT_FOUND);
        }

        marca.delete();
        return Response.status(204).build();
    }

}