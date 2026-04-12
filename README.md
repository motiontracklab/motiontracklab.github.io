# Seguimiento de Trayectoria

Aplicación web estática para estudiar cinemática en ESO a partir de un vídeo. El alumnado puede cargar un vídeo, marcar una pelota o una masa, seguir su posición y obtener las gráficas `x(t)` e `y(t)`.

## Qué hace

- Carga un vídeo local en el navegador.
- Permite definir el instante inicial y final del análisis.
- Permite previsualizar solo ese tramo con la velocidad de reproducción elegida.
- Permite corregir la orientación típica de vídeos de móvil o tablet.
- Permite hacer `flip` horizontal y vertical antes del análisis.
- Permite marcar manualmente el punto inicial.
- Sigue el objeto cuadro a cuadro con una búsqueda local alrededor de la posición anterior.
- Dibuja la trayectoria seguida directamente sobre el vídeo.
- Genera dos gráficas de posición frente al tiempo.
- Permite calibrar una distancia conocida para obtener resultados en metros u otra unidad real.
- Muestra una tabla con los datos y permite exportarlos a CSV.

## Uso en local

Basta con abrir [index.html](./index.html) en el navegador. Si prefieres un servidor local:

```bash
python3 -m http.server
```

Y después abrir `http://localhost:8000`.

## Publicación en GitHub Pages

1. Sube estos archivos al repositorio.
2. En GitHub, abre `Settings > Pages`.
3. En `Build and deployment`, selecciona `Deploy from a branch`.
4. Elige la rama principal y la carpeta `/ (root)`.

## Limitaciones

- Las coordenadas se expresan en píxeles.
- Funciona mejor cuando el objeto tiene buen contraste con el fondo.
- Si hay movimientos muy bruscos, puede ser necesario aumentar la ventana de búsqueda.
- Si el punto desaparece temporalmente o queda oculto, el seguimiento puede perderse.
- Si cambias la orientación o haces `flip`, conviene recalibrar y volver a marcar el punto inicial.
- No sustituye a un laboratorio de análisis de vídeo avanzado, pero es suficiente para actividades de introducción a la cinemática en secundaria.
