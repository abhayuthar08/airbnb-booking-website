// This script calculates the total price based on check-in and check-out dates and integrates Stripe payment

document.addEventListener('DOMContentLoaded', function () {
    console.log('booking.js loaded');
    const checkin = document.getElementById('checkin');
    const checkout = document.getElementById('checkout');
    const pricePerNight = parseInt(document.getElementById('listing-price').dataset.price, 10);
    const totalPriceDiv = document.getElementById('total-price');
    const stripeBtn = document.getElementById('stripe-btn');
    let total = 0;

    function calculateTotal() {
        console.log('Check-in:', checkin.value, 'Check-out:', checkout.value);
        if (checkin.value && checkout.value) {
            const inDate = new Date(checkin.value);
            const outDate = new Date(checkout.value);
            const diffTime = outDate - inDate;
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            if (diffDays > 0) {
                total = diffDays * pricePerNight;
                totalPriceDiv.innerText = `Total Price: ₹${total.toLocaleString('en-IN')}`;
                stripeBtn.disabled = false;
                console.log('Stripe button enabled');
            } else {
                totalPriceDiv.innerText = 'Check-out must be after check-in.';
                stripeBtn.disabled = true;
                console.log('Stripe button disabled: invalid date range');
            }
        } else {
            totalPriceDiv.innerText = '';
            stripeBtn.disabled = true;
            console.log('Stripe button disabled: missing dates');
        }
    }

    checkin.addEventListener('change', calculateTotal);
    checkout.addEventListener('change', calculateTotal);

    // Stripe payment
    stripeBtn.addEventListener('click', function (e) {
        e.preventDefault();
        if (total > 0) {
            console.log('Initiating Stripe payment for amount:', total);
            fetch(window.location.pathname + '/create-checkout-session', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ amount: total * 100 }) // Stripe expects paise
            })
            .then(res => res.json())
            .then(data => {
                if (data.url) {
                    window.location = data.url;
                } else {
                    console.error('Stripe session creation failed', data);
                }
            });
        }
    });
});
