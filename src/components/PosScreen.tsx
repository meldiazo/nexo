"use client";
import { useState } from 'react';
import { Search, ScanBarcode, ShoppingCart, Plus, Minus, Trash2, ChevronRight, CheckCircle2 } from 'lucide-react';
import { usePosStore, Product } from '../store/posStore';
import { catalog } from './InventoryScreen';

export function PosScreen() {
  const [searchTerm, setSearchTerm] = useState('');
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [success, setSuccess] = useState(false);
  
  const { cart, addToCart, removeFromCart, updateQuantity, clearCart, getCartTotal, getCartItemsCount } = usePosStore();

  const filteredCatalog = catalog.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    p.sku.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCheckout = () => {
    setIsCheckingOut(true);
    // Simulate API call
    setTimeout(() => {
      setIsCheckingOut(false);
      setSuccess(true);
      clearCart();
      setTimeout(() => setSuccess(false), 3000);
    }, 1500);
  };

  if (success) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center bg-zinc-950 p-6 h-full animate-in fade-in zoom-in duration-500">
        <div className="size-20 bg-green-500/20 rounded-full flex items-center justify-center mb-6">
          <CheckCircle2 className="size-10 text-green-500" />
        </div>
        <h2 className="text-2xl font-semibold text-zinc-100 tracking-tight text-center">¡Venta Registrada!</h2>
        <p className="text-zinc-400 mt-2 text-center max-w-xs">
          El inventario ha sido actualizado correctamente.
        </p>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col bg-zinc-950 h-full overflow-hidden relative">
      {/* Header & Search */}
      <div className="px-6 py-6 bg-zinc-950 shrink-0 z-10 sticky top-0 border-b border-zinc-900">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-semibold text-zinc-100 tracking-tight">Punto de Venta</h1>
        </div>
        
        <div className="relative group">
          <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
            <Search className="size-5 text-zinc-500 group-focus-within:text-blue-500 transition-colors" />
          </div>
          <input
            type="text"
            className="w-full h-14 bg-zinc-900/50 border border-zinc-800 rounded-2xl pl-12 pr-14 text-zinc-100 text-lg placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500/50 transition-all backdrop-blur-xl"
            placeholder="Buscar o escanear..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button className="absolute inset-y-0 right-2 flex items-center px-3 hover:bg-zinc-800 rounded-xl transition-colors m-1">
            <ScanBarcode className="size-6 text-zinc-400" />
          </button>
        </div>
      </div>

      {/* Catalog Grid */}
      <div className="flex-1 overflow-y-auto px-6 pb-40 pt-4">
        <div className="grid grid-cols-2 gap-4">
          {filteredCatalog.map(product => {
            const isOutOfStock = product.stock <= 0;
            return (
              <button
                key={product.id}
                onClick={() => !isOutOfStock && addToCart(product)}
                disabled={isOutOfStock}
                className={`flex flex-col text-left p-4 rounded-2xl border transition-all active:scale-95 ${
                  isOutOfStock 
                    ? 'bg-zinc-900/20 border-zinc-900 opacity-50 cursor-not-allowed' 
                    : 'bg-zinc-900/50 border-zinc-800 hover:border-zinc-700 hover:bg-zinc-800/80'
                }`}
              >
                <span className="text-xs font-mono text-zinc-500 mb-1">{product.sku}</span>
                <span className="text-sm font-medium text-zinc-200 line-clamp-2 leading-tight mb-3 flex-1">
                  {product.name}
                </span>
                <div className="flex items-end justify-between w-full mt-auto">
                  <span className="text-lg font-semibold text-zinc-100">Bs {product.price}</span>
                  <span className={`text-xs font-medium px-2 py-1 rounded-md ${isOutOfStock ? 'bg-red-500/10 text-red-400' : 'bg-zinc-800 text-zinc-400'}`}>
                    {product.stock} un.
                  </span>
                </div>
              </button>
            )
          })}
        </div>
      </div>

      {/* Floating Cart Drawer */}
      <div 
        className={`absolute bottom-0 left-0 right-0 bg-zinc-900 border-t border-zinc-800 shadow-[0_-20px_40px_rgba(0,0,0,0.5)] transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] rounded-t-3xl ${
          cart.length > 0 ? 'translate-y-0' : 'translate-y-full'
        }`}
        style={{ paddingBottom: 'max(env(safe-area-inset-bottom), 1.5rem)' }}
      >
        {/* Drawer Handle */}
        <div className="w-full flex justify-center pt-3 pb-1">
          <div className="w-12 h-1.5 bg-zinc-700 rounded-full" />
        </div>

        <div className="px-6 pt-2 pb-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-zinc-100 flex items-center gap-2">
              <ShoppingCart className="size-5 text-blue-500" />
              Carrito
            </h3>
            <span className="text-sm font-medium text-zinc-400 bg-zinc-800 px-3 py-1 rounded-full">
              {getCartItemsCount()} items
            </span>
          </div>

          {/* Cart Items List */}
          <div className="max-h-[30vh] overflow-y-auto space-y-3 mb-6 pr-2">
            {cart.map(item => (
              <div key={item.id} className="flex items-center justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-zinc-200 truncate">{item.name}</p>
                  <p className="text-xs text-zinc-500">Bs {item.price} x {item.quantity}</p>
                </div>
                
                <div className="flex items-center gap-3 bg-zinc-950 rounded-xl p-1 border border-zinc-800 shrink-0">
                  <button 
                    onClick={() => {
                      if (item.quantity > 1) updateQuantity(item.id, item.quantity - 1);
                      else removeFromCart(item.id);
                    }}
                    className="p-1.5 hover:bg-zinc-800 rounded-lg text-zinc-400 transition-colors"
                  >
                    {item.quantity === 1 ? <Trash2 className="size-4 text-red-400" /> : <Minus className="size-4" />}
                  </button>
                  <span className="w-4 text-center text-sm font-medium text-zinc-200">
                    {item.quantity}
                  </span>
                  <button 
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    disabled={item.quantity >= item.stock}
                    className="p-1.5 hover:bg-zinc-800 rounded-lg text-zinc-400 disabled:opacity-30 transition-colors"
                  >
                    <Plus className="size-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Total & Checkout */}
          <div className="pt-4 border-t border-zinc-800/50 flex items-center justify-between gap-4">
            <div>
              <p className="text-sm text-zinc-500 mb-0.5">Total a cobrar</p>
              <p className="text-2xl font-bold text-zinc-100 tracking-tight">Bs {getCartTotal().toFixed(2)}</p>
            </div>
            <button 
              onClick={handleCheckout}
              disabled={isCheckingOut}
              className="flex-1 h-14 bg-blue-600 hover:bg-blue-500 active:bg-blue-700 text-white rounded-2xl font-medium text-lg flex items-center justify-center gap-2 transition-all shadow-[0_0_20px_rgba(37,99,235,0.3)] disabled:opacity-50"
            >
              {isCheckingOut ? (
                <span className="animate-pulse">Procesando...</span>
              ) : (
                <>
                  Cobrar <ChevronRight className="size-5" />
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
