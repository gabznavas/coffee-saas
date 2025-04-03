package io.github.gabznavas.api.entity;

import jakarta.persistence.*;

import java.time.Instant;
import java.util.Objects;

@Entity
@Table(name = "command_items")
public class CommandItem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "quantity", length = 255, nullable = false)
    private Long quantity;

    @Column(name = "price", length = 255, nullable = false)
    private Double price;

    @ManyToOne
    @JoinColumn(name = "command_id", referencedColumnName = "id")
    private Command command;

    @Column(name = "observations", length = 255, nullable = false)
    private String observations;

    @Column(name = "canceled_in")
    private Instant canceledIn;

    @ManyToOne
    @JoinColumn(name = "product_id", referencedColumnName = "id")
    private Product product;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getQuantity() {
        return quantity;
    }

    public void setQuantity(Long quantity) {
        this.quantity = quantity;
    }

    public Double getPrice() {
        return price;
    }

    public void setPrice(Double price) {
        this.price = price;
    }

    public Command getCommand() {
        return command;
    }

    public void setCommand(Command command) {
        this.command = command;
    }

    public String getObservations() {
        return observations;
    }

    public void setObservations(String observations) {
        this.observations = observations;
    }

    public Instant getCanceledIn() {
        return canceledIn;
    }

    public void setCanceledIn(Instant canceledIn) {
        this.canceledIn = canceledIn;
    }

    public Product getProduct() {
        return product;
    }

    public void setProduct(Product product) {
        this.product = product;
    }

    @Override
    public boolean equals(Object o) {
        if (o == null || getClass() != o.getClass()) return false;
        CommandItem that = (CommandItem) o;
        return Objects.equals(id, that.id) && Objects.equals(quantity, that.quantity) && Objects.equals(price, that.price) && Objects.equals(command, that.command) && Objects.equals(observations, that.observations) && Objects.equals(canceledIn, that.canceledIn) && Objects.equals(product, that.product);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, quantity, price, command, observations, canceledIn, product);
    }
}
