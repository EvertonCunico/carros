package com.evertoncunico.carros.marca;

import java.io.Serializable;

public class Marca implements Serializable {

    public Marca() {
    }

    public Marca(Integer id, String nome) {
        this.id = id;
        this.nome = nome;
    }

    private Integer id;
    private String nome;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    @Override
    public String toString() {
        return nome;
    }
}
