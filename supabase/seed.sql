-- Seed Data para Nexo MVP
-- Este script inyecta datos de prueba para verificar las reglas de negocio, 
-- políticas RLS y alertas predictivas (Carnaval, Fexpocruz, Clima Invierno).

-- NOTA: Asegúrate de reemplazar el `tenant_id` y `auth_user_id` con los IDs reales
-- de tu proyecto si los tienes en la tabla profiles. Si estás probando con RLS activado, 
-- el usuario logueado solo verá los datos asociados a su tenant.

BEGIN;

-- 1. Tenants (Marcas)
INSERT INTO public.tenants (id, name, created_at)
VALUES 
  ('11111111-1111-1111-1111-111111111111', 'Moda Santa Cruz (Tenant Demo)', NOW())
ON CONFLICT (id) DO NOTHING;

-- 2. Proveedores
INSERT INTO public.providers (id, tenant_id, name, lead_time_days, contact_email)
VALUES 
  ('22222222-2222-2222-2222-222222222221', '11111111-1111-1111-1111-111111111111', 'Textiles Urubó S.A.', 15, 'urubo@textiles.com.bo'),
  ('22222222-2222-2222-2222-222222222222', '11111111-1111-1111-1111-111111111111', 'Importaciones Gafas y Accesorios', 20, 'import@accesorios.bo'),
  ('22222222-2222-2222-2222-222222222223', '11111111-1111-1111-1111-111111111111', 'Abrigos Andinos (Invierno)', 10, 'ventas@abrigosandinos.com')
ON CONFLICT (id) DO NOTHING;

-- 3. Productos (Para Insights: Carnaval, Invierno, Fexpocruz, Normal)
INSERT INTO public.products (id, tenant_id, name, description, category, base_price, base_cost)
VALUES 
  -- Carnaval (Shorts, Tops)
  ('33333333-3333-3333-3333-333333333331', '11111111-1111-1111-1111-111111111111', 'Short de Mezclilla', 'Short cómodo ideal para altas temperaturas y fiestas.', 'Ropa', 180, 80),
  ('33333333-3333-3333-3333-333333333332', '11111111-1111-1111-1111-111111111111', 'Top Blanco Básico', 'Top de algodón transpirable.', 'Ropa', 90, 40),
  
  -- Fexpocruz (Premium, Zapatillas)
  ('33333333-3333-3333-3333-333333333333', '11111111-1111-1111-1111-111111111111', 'Zapatillas Running Premium', 'Zapatillas de alta gama para caminatas largas.', 'Calzado', 450, 200),
  ('33333333-3333-3333-3333-333333333334', '11111111-1111-1111-1111-111111111111', 'Gafas de Sol Premium', 'Gafas con protección UV 400 polarizadas.', 'Accesorios', 320, 150),
  
  -- Clima Invierno (Suéteres, Chaquetas)
  ('33333333-3333-3333-3333-333333333335', '11111111-1111-1111-1111-111111111111', 'Suéter de Lana', 'Suéter tejido grueso para surazos.', 'Ropa', 410, 190),
  ('33333333-3333-3333-3333-333333333336', '11111111-1111-1111-1111-111111111111', 'Chaqueta Invierno', 'Chaqueta impermeable forrada.', 'Ropa', 380, 170),
  
  -- Demanda Constante / Otros
  ('33333333-3333-3333-3333-333333333337', '11111111-1111-1111-1111-111111111111', 'Pantalón Casual', 'Pantalón drill para el día a día.', 'Ropa', 250, 110),
  ('33333333-3333-3333-3333-333333333338', '11111111-1111-1111-1111-111111111111', 'Gorra Urbana', 'Gorra con ajuste metálico trasero.', 'Accesorios', 150, 60)
ON CONFLICT (id) DO NOTHING;

-- 4. Variantes (Control de Inventario y Reorden)
INSERT INTO public.variants (id, tenant_id, product_id, sku, attributes, current_stock, rop, safety_stock)
VALUES 
  -- Carnaval (Short y Top) - Stock Crítico para que salten las alertas de Carnaval
  ('44444444-4444-4444-4444-444444444441', '11111111-1111-1111-1111-111111111111', '33333333-3333-3333-3333-333333333331', 'SHO-005-BL-M', '{"color": "Azul", "talla": "M"}', 8, 20, 5),
  ('44444444-4444-4444-4444-444444444442', '11111111-1111-1111-1111-111111111111', '33333333-3333-3333-3333-333333333332', 'TOP-006-BL-S', '{"color": "Blanco", "talla": "S"}', 12, 30, 8),
  
  -- Fexpocruz (Zapatillas y Gafas)
  ('44444444-4444-4444-4444-444444444443', '11111111-1111-1111-1111-111111111111', '33333333-3333-3333-3333-333333333333', 'ZAP-003-NE-42', '{"color": "Negro", "talla": "42"}', 5, 15, 4),
  ('44444444-4444-4444-4444-444444444444', '11111111-1111-1111-1111-111111111111', '33333333-3333-3333-3333-333333333334', 'GAF-007-UN', '{"color": "Carey", "talla": "UN"}', 10, 25, 6),

  -- Clima Invierno
  ('44444444-4444-4444-4444-444444444445', '11111111-1111-1111-1111-111111111111', '33333333-3333-3333-3333-333333333335', 'SUE-009-GR-L', '{"color": "Gris", "talla": "L"}', 2, 10, 2),
  ('44444444-4444-4444-4444-444444444446', '11111111-1111-1111-1111-111111111111', '33333333-3333-3333-3333-333333333336', 'CHA-004-VE-M', '{"color": "Verde", "talla": "M"}', 4, 12, 3),

  -- Demanda Constante
  ('44444444-4444-4444-4444-444444444447', '11111111-1111-1111-1111-111111111111', '33333333-3333-3333-3333-333333333337', 'PAN-002-KA-32', '{"color": "Kaki", "talla": "32"}', 45, 20, 5),
  ('44444444-4444-4444-4444-444444444448', '11111111-1111-1111-1111-111111111111', '33333333-3333-3333-3333-333333333338', 'GOR-010-NE-UN', '{"color": "Negro", "talla": "UN"}', 38, 15, 4)
ON CONFLICT (id) DO NOTHING;

COMMIT;
