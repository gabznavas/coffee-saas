package io.github.gabznavas.api.entity;

import jakarta.persistence.*;

import java.time.Instant;
import java.util.Objects;

@Entity
@Table(name = "payment_items")
public class PaymentItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "price", nullable = false)
    private Double price;

    @Column(name = "quantity", nullable = false)
    private Long quantity;

    @Column(name = "observations", nullable = false, length = 255)
    private String observations;

    @ManyToOne
    @JoinColumn(name = "payment_id", referencedColumnName = "id")
    private Payment payment;

    @ManyToOne
    @JoinColumn(name = "command_item_id", referencedColumnName = "id")
    private CommandItem commandItem;

    @Column(name = "created_at", nullable = false)
    private Instant createdAt;

    @Column(name = "canceled_in")
    private Instant canceledAt;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Double getPrice() {
        return price;
    }

    public void setPrice(Double price) {
        this.price = price;
    }

    public Long getQuantity() {
        return quantity;
    }

    public void setQuantity(Long quantity) {
        this.quantity = quantity;
    }

    public String getObservations() {
        return observations;
    }

    public void setObservations(String observations) {
        this.observations = observations;
    }

    public Payment getPayment() {
        return payment;
    }

    public void setPayment(Payment payment) {
        this.payment = payment;
    }

    public CommandItem getCommandItem() {
        return commandItem;
    }

    public void setCommandItem(CommandItem commandItem) {
        this.commandItem = commandItem;
    }

    public Instant getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Instant createdAt) {
        this.createdAt = createdAt;
    }

    public Instant getCanceledAt() {
        return canceledAt;
    }

    public void setCanceledAt(Instant canceledAt) {
        this.canceledAt = canceledAt;
    }

    @Override
    public boolean equals(Object o) {
        if (o == null || getClass() != o.getClass()) return false;
        PaymentItem that = (PaymentItem) o;
        return Objects.equals(id, that.id) && Objects.equals(price, that.price) && Objects.equals(quantity, that.quantity) && Objects.equals(observations, that.observations) && Objects.equals(payment, that.payment) && Objects.equals(commandItem, that.commandItem) && Objects.equals(createdAt, that.createdAt) && Objects.equals(canceledAt, that.canceledAt);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, price, quantity, observations, payment, commandItem, createdAt, canceledAt);
    }
}
