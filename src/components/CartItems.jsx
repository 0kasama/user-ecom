import { deleteCartItem, updateCart } from "@/fetch/cart";
import { useRouter } from "next/navigation";

export default function CartItem(props) {
  const cart_item = props.item;
  const router = useRouter();

  async function handleDelete() {
    const params = {
      product_id: cart_item.product_id,
    };
    await deleteCartItem(params);
    window.location.reload();
  }

  async function handleQuantity(event) {
    const selectedQuantity = event.target.value;
    console.log(selectedQuantity);
    const params = {
      cart_items_attributes: [
        {
          product_id: cart_item.product_id,
          quantity: +selectedQuantity,
          price: cart_item.price,
        },
      ],
    };
    const updateCartItem = await updateCart(params);
    window.location.reload();
  }

  return (
    <div>
      <div className="card card-side bg-base-100 shadow-xl">
        <figure>
          <img
            src="https://img.daisyui.com/images/stock/photo-1635805737707-575885ab0820.jpg"
            alt="Movie"
          />
        </figure>
        <div className="card-body">
          <div className="flex justify-between">
            <h2 className="card-title">{cart_item.product.name}</h2>
            <div
              className="hover:cursor-pointer font-bold"
              onClick={handleDelete}
            >
              X
            </div>
          </div>
          <p>SKU : {cart_item.product.sku}</p>
          <p>Price : {cart_item.product.price}</p>
          <div className="flex justify-between">
            <select
              className="select select-bordered w-full max-w-xs"
              defaultValue={cart_item.quantity}
              onChange={handleQuantity}
            >
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>

            <div>Sub Total : {cart_item.price * cart_item.quantity}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
