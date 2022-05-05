package org.carros.shared;

import io.quarkus.hibernate.orm.panache.PanacheEntityBase;

import javax.ws.rs.core.Response;
import java.util.List;

public interface IResource<T extends PanacheEntityBase> {
    List<T> listarTodos();
    Response incluir(T t);
    Response atualizar(Long id, T t);
    Response excluir(Long id);
}
