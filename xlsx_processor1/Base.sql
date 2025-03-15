-- # View All tables 
SELECT table_name, table_type, table_schema
FROM information_schema.tables
WHERE table_schema = 'public'
ORDER BY table_name;

-- Auth Table
Select * from public.authentication_customuser;

-- Monthlt Forecast Table
Select * from public.forecast_monthlyforecast;

-- Product Details
Select * from public.forecast_productdetail;
