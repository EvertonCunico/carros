package org.carros.shared;

import javax.enterprise.context.ApplicationScoped;

@ApplicationScoped
public interface IController<T> {

    T update(Long id, T t);

}