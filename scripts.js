document.addEventListener('DOMContentLoaded', () => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Atualiza a página do carrinho
    function updateCartPage() {
        const cartItemsContainer = document.getElementById('cart-items');
        const subtotalElem = document.getElementById('cart-subtotal');
        const totalElem = document.getElementById('cart-total');

        // Limpa a lista de itens
        cartItemsContainer.innerHTML = '';

        let subtotal = 0;

        cart.forEach(item => {
            const cartItem = document.createElement('div');
            cartItem.classList.add('cart-item');
            cartItem.innerHTML = `
                <img src="${item.image}" alt="${item.name}">
                <div class="item-info">
                    <h3>${item.name}</h3>
                    <p>Quantidade: ${item.quantity}</p>
                    <p>Preço Unitário: R$ ${item.price}</p>
                    <p>Total: R$ ${(item.price * item.quantity).toFixed(2)}</p>
                </div>
            `;
            cartItemsContainer.appendChild(cartItem);

            subtotal += item.price * item.quantity;
        });

        subtotalElem.textContent = `Subtotal: R$ ${subtotal.toFixed(2)}`;
        totalElem.textContent = `Total: R$ ${(subtotal + 20).toFixed(2)}`; // Considera frete de R$20,00
    }

    // Adiciona produto ao carrinho
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', () => {
            const id = button.getAttribute('data-id');
            const name = button.getAttribute('data-name');
            const price = parseFloat(button.getAttribute('data-price'));

            const item = cart.find(item => item.id === id);
            if (item) {
                item.quantity += 1;
            } else {
                cart.push({ id, name, price, quantity: 1, image: button.getAttribute('data-image') });
            }

            localStorage.setItem('cart', JSON.stringify(cart));
            alert('Produto adicionado ao carrinho!');
        });
    });

    // Atualiza a página do carrinho se estiver na página do carrinho
    if (document.getElementById('cart-items')) {
        updateCartPage();
    }
});
