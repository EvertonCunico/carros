package org.carros.carro;

import io.quarkus.hibernate.orm.panache.PanacheEntityBase;
import lombok.*;
import org.carros.marca.Marca;

import javax.persistence.*;
import javax.validation.constraints.Min;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
@Table(name = "carro")
public class Carro extends PanacheEntityBase {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(length = 30)
    private String modelo;

    @ManyToOne()
    @JoinColumn(name = "marcaId")
    private Marca marca;

    @Column
    @Enumerated(EnumType.STRING)
    private CarroCor cor;

    @Column
    private Integer ano;

}