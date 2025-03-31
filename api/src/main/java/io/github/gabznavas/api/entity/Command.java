package io.github.gabznavas.api.entity;

import jakarta.persistence.*;

import java.time.LocalDateTime;
import java.util.Objects;

@Entity
@Table(name = "commands")
public class Command {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;


    @Column(name = "client_name", nullable = false, length = 45)
    private String clientName;

    @Column(name = "price_total", nullable = false)
    private Double priceTotal;

    @Column(name = "opened_at", nullable = false)
    private LocalDateTime openedAt;
    @Column(name = "canceled_in", nullable = false)
    private LocalDateTime canceledIn;
    @Column(name = "closed_at", nullable = false)
    private LocalDateTime closedAt;

    @ManyToOne
    @JoinColumn(name = "dining_table_id", referencedColumnName = "id")
    private DiningTable diningTable;

    @ManyToOne
    @JoinColumn(name = "attendant_id", referencedColumnName = "id")
    private User attendant;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getClientName() {
        return clientName;
    }

    public void setClientName(String clientName) {
        this.clientName = clientName;
    }

    public Double getPriceTotal() {
        return priceTotal;
    }

    public void setPriceTotal(Double priceTotal) {
        this.priceTotal = priceTotal;
    }

    public LocalDateTime getOpenedAt() {
        return openedAt;
    }

    public void setOpenedAt(LocalDateTime openedAt) {
        this.openedAt = openedAt;
    }

    public LocalDateTime getCanceledIn() {
        return canceledIn;
    }

    public void setCanceledIn(LocalDateTime canceledIn) {
        this.canceledIn = canceledIn;
    }

    public LocalDateTime getClosedAt() {
        return closedAt;
    }

    public void setClosedAt(LocalDateTime closedAt) {
        this.closedAt = closedAt;
    }

    public DiningTable getDiningTable() {
        return diningTable;
    }

    public void setDiningTable(DiningTable diningTable) {
        this.diningTable = diningTable;
    }

    public User getAttendant() {
        return attendant;
    }

    public void setAttendant(User attendant) {
        this.attendant = attendant;
    }

    @Override
    public boolean equals(Object o) {
        if (o == null || getClass() != o.getClass()) return false;
        Command command = (Command) o;
        return Objects.equals(id, command.id) && Objects.equals(clientName, command.clientName) && Objects.equals(priceTotal, command.priceTotal) && Objects.equals(openedAt, command.openedAt) && Objects.equals(canceledIn, command.canceledIn) && Objects.equals(closedAt, command.closedAt) && Objects.equals(diningTable, command.diningTable) && Objects.equals(attendant, command.attendant);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, clientName, priceTotal, openedAt, canceledIn, closedAt, diningTable, attendant);
    }
}
