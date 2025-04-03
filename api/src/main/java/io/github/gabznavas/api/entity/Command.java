package io.github.gabznavas.api.entity;

import jakarta.persistence.*;
import org.hibernate.annotations.BatchSize;

import java.time.Instant;
import java.util.ArrayList;
import java.util.List;
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
    private Instant openedAt;
    @Column(name = "canceled_in", nullable = false)
    private Instant canceledIn;
    @Column(name = "closed_at", nullable = false)
    private Instant closedAt;
    @ManyToOne
    @JoinColumn(name = "dining_table_id", referencedColumnName = "id")
    private DiningTable diningTable;
    @ManyToOne
    @JoinColumn(name = "attendant_id", referencedColumnName = "id")
    private User attendant;


    @OneToMany(mappedBy = "command")
    @OrderBy("id ASC")
    @BatchSize(size = 10)
    private List<CommandItem> commandItems = new ArrayList<>();

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

    public Instant getOpenedAt() {
        return openedAt;
    }

    public void setOpenedAt(Instant openedAt) {
        this.openedAt = openedAt;
    }

    public Instant getCanceledIn() {
        return canceledIn;
    }

    public void setCanceledIn(Instant canceledIn) {
        this.canceledIn = canceledIn;
    }

    public Instant getClosedAt() {
        return closedAt;
    }

    public void setClosedAt(Instant closedAt) {
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

    public List<CommandItem> getCommandItems() {
        return commandItems;
    }

    public void setCommandItems(List<CommandItem> commandItems) {
        this.commandItems = commandItems;
    }

    @Override
    public boolean equals(Object o) {
        if (o == null || getClass() != o.getClass()) return false;
        Command command = (Command) o;
        return Objects.equals(id, command.id) && Objects.equals(clientName, command.clientName) && Objects.equals(priceTotal, command.priceTotal) && Objects.equals(openedAt, command.openedAt) && Objects.equals(canceledIn, command.canceledIn) && Objects.equals(closedAt, command.closedAt) && Objects.equals(diningTable, command.diningTable) && Objects.equals(attendant, command.attendant) && Objects.equals(commandItems, command.commandItems);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, clientName, priceTotal, openedAt, canceledIn, closedAt, diningTable, attendant, commandItems);
    }
}
