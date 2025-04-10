package io.github.gabznavas.api.service;

import io.github.gabznavas.api.dto.CreatePaymentDto;
import io.github.gabznavas.api.dto.PaymentDto;
import io.github.gabznavas.api.entity.*;
import io.github.gabznavas.api.exception.CommandNotFoundByException;
import io.github.gabznavas.api.exception.PaymentMethodNotFoundByException;
import io.github.gabznavas.api.exception.UserNotFoundByException;
import io.github.gabznavas.api.mapper.PaymentMapper;
import io.github.gabznavas.api.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.List;

@Service
public class PaymentService {

    @Autowired
    private PaymentRepository paymentRepository;

    @Autowired
    private PaymentItemRepository paymentItemRepository;


    @Autowired
    private PaymentMethodRepository paymentMethodRepository;

    @Autowired
    private CommandRepository commandRepository;

    @Autowired
    private UserRepository userRepository;


    @Autowired
    private CommandItemRepository commandItemRepository;


    @Autowired
    private PaymentMapper paymentMapper;


    public PaymentDto createPayment(CreatePaymentDto dto) {
        final PaymentMethod paymentMethod = paymentMethodRepository.findById(dto.paymentMethodId())
                .orElseThrow(() -> new PaymentMethodNotFoundByException("id"));

        final Command command = commandRepository.findById(dto.commandId())
                .orElseThrow(() -> new CommandNotFoundByException("id"));

        final User user = userRepository.findById(dto.cashierId())
                .orElseThrow(() -> new UserNotFoundByException("id"));


        final Payment payment = new Payment();
        payment.setCommand(command);
        payment.setUser(user);
        payment.setTotalPrice(command.getPriceTotal());
        payment.setPaymentMethod(paymentMethod);

        final List<CommandItem> commandItems = commandItemRepository.findAllByCommandId(dto.commandId());
        command.setClosedAt(Instant.now());

        final List<PaymentItem> paymentItems = commandItems
                .stream()
                .map(commandItem -> {
                    final PaymentItem paymentItem = new PaymentItem();
                    paymentItem.setCommandItem(commandItem);
                    paymentItem.setPayment(payment);
                    paymentItem.setPrice(paymentItem.getPrice());
                    paymentItem.setQuantity(paymentItem.getQuantity());
                    paymentItem.setCreatedAt(Instant.now());
                    paymentItem.setObservations(commandItem.getObservations());
                    return paymentItem;
                })
                .toList();
        paymentItemRepository.saveAll(paymentItems);

        payment.setPaymentItems(paymentItems);
        return paymentMapper.entityToDTO(payment);
    }
}
