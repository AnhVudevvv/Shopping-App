import { useCart } from "../../hooks/useCart";
import { useUser } from "../../hooks/useUser";
import { Navigate } from "react-router-dom";
import { formatCurrency } from "../../utils/formatCurrency";

const Cart = () => {
    const { currentUserCartItems, removeProduct, increaseQuantity, decreaseQuantity, clearCart, totalQuantity, totalPrice } = useCart();
    const { user } = useUser();
    
    if (!user) {
        return <Navigate to="/login" replace />;
    }

    return (
        <div className="min-h-screen bg-[var(--bg)] px-6 py-10">
            <div className="mx-auto max-w-6xl">
                <div className="grid gap-6 lg:grid-cols-3">
                    <div className="space-y-4 lg:col-span-2">
                        {currentUserCartItems.length === 0 && (
                            <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-8 text-center text-[var(--text)] shadow-sm">
                                Your cart is empty.
                            </div>
                        )}

                        {currentUserCartItems.map((item) => (
                            <div key={item.id} className="flex gap-4 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-4 shadow-sm">
                                <img
                                    src={item.image}
                                    alt={item.name}
                                    className="h-28 w-28 rounded-xl object-cover"
                                />

                                <div className="flex flex-1 justify-between">
                                    <div className="flex flex-col justify-center items-start gap-1">
                                        <h2 className="text-lg font-semibold text-[var(--text-h)]">
                                            {item.name}
                                        </h2>

                                        <p className="mt-1 text-sm text-[var(--text)]">
                                            Category: {item.category}
                                        </p>
                                        <p className="mt-1 text-sm text-[var(--text)]">
                                            Description: {item.description}
                                        </p>

                                        <p className="mt-4 text-lg font-bold text-[var(--text-h)]">
                                            Price: {formatCurrency(item.price)}
                                        </p>
                                    </div>

                                    <div className="mt-4 flex items-center flex-col justify-between">
                                        <div className="flex items-center rounded-xl border border-[var(--border)] shadow-sm">
                                            <button onClick={() => decreaseQuantity(item.id)} className="px-3 py-2 text-lg font-bold text-[var(--text-h)] hover:bg-[var(--social-bg)] cursor-pointer">
                                                -
                                            </button>

                                            <span className="px-3 py-2 text-[var(--text-h)] mt-1">
                                                {item.quantity}
                                            </span>

                                            <button onClick={() => increaseQuantity(item.id)} className="px-3 py-2 text-lg font-bold text-[var(--text-h)] hover:bg-[var(--social-bg)] cursor-pointer">
                                                +
                                            </button>
                                        </div>

                                        <button onClick={() => removeProduct(item.id)} className="rounded-xl shadow-sm w-full bg-[var(--danger)] px-4 py-2 text-sm font-semibold text-[var(--button-text)] hover:bg-[var(--danger-hover)]">
                                            Remove
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}


                    </div>

                    <div className="h-fit rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 shadow-sm">
                        <h2 className="mb-6 text-xl font-bold text-[var(--text-h)]">
                            Order Summary
                        </h2>

                        <div className="space-y-4 text-[var(--text)]">
                            <div className="flex justify-between">
                                <span>Total products</span>
                                <span>{totalQuantity}</span>
                            </div>

                            <div className="flex justify-between">
                                <span>Subtotal</span>
                                <span>{formatCurrency(totalPrice)}</span>
                            </div>



                            <hr className="border-[var(--border)]" />

                            <div className="flex justify-between text-lg font-bold text-[var(--text-h)]">
                                <span>Total</span>
                                <span>{formatCurrency(totalPrice)}</span>
                            </div>
                        </div>



                        <button onClick={clearCart} className="mt-3 w-full rounded-xl border border-[var(--danger)] py-3 font-semibold text-[var(--danger)] hover:bg-[var(--danger-bg)]">
                            Clear Cart
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;
