// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract SubscriptionManager {
    struct Subscription {
        uint256 amount; // Плата за подписку
        uint256 frequency; // Частота оплаты (в секундах)
        uint256 nextPayment; // Время следующего платежа
        bool active; // Статус подписки
    }

    address public owner;
    mapping(address => Subscription) public subscriptions;
    mapping(address => uint256) public balances;

    event SubscriptionCreated(address indexed user, uint256 amount, uint256 frequency);
    event SubscriptionCancelled(address indexed user);
    event PaymentReceived(address indexed user, uint256 amount);

    modifier onlyOwner() {
        require(msg.sender == owner, "Not authorized");
        _;
    }

    constructor() {
        owner = msg.sender;
    }

    function createSubscription(uint256 amount, uint256 frequency) external {
        require(subscriptions[msg.sender].active == false, "Already subscribed");

        subscriptions[msg.sender] = Subscription({
            amount: amount,
            frequency: frequency,
            nextPayment: block.timestamp + frequency,
            active: true
        });

        emit SubscriptionCreated(msg.sender, amount, frequency);
    }

    function cancelSubscription() external {
        require(subscriptions[msg.sender].active == true, "No active subscription");

        subscriptions[msg.sender].active = false;
        emit SubscriptionCancelled(msg.sender);
    }

    function paySubscription() external payable {
        Subscription storage subscription = subscriptions[msg.sender];
        require(subscription.active, "No active subscription");
        require(block.timestamp >= subscription.nextPayment, "Payment not due yet");
        require(msg.value == subscription.amount, "Incorrect amount");

        subscription.nextPayment += subscription.frequency;
        balances[owner] += msg.value;
        
        emit PaymentReceived(msg.sender, msg.value);
    }

    function withdrawFunds() external onlyOwner {
        uint256 amount = balances[owner];
        require(amount > 0, "No funds to withdraw");

        balances[owner] = 0;
        payable(owner).transfer(amount);
    }
}
