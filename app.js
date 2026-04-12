const videoInput = document.getElementById("videoInput");
const manualModeBtn = document.getElementById("manualModeBtn");
const calibrateBtn = document.getElementById("calibrateBtn");
const playPauseBtn = document.getElementById("playPauseBtn");
const trackBtn = document.getElementById("trackBtn");
const resetBtn = document.getElementById("resetBtn");
const exportBtn = document.getElementById("exportBtn");
const timelineRange = document.getElementById("timelineRange");
const setStartBtn = document.getElementById("setStartBtn");
const setEndBtn = document.getElementById("setEndBtn");
const jumpStartBtn = document.getElementById("jumpStartBtn");
const jumpEndBtn = document.getElementById("jumpEndBtn");
const timelineCurrentLabel = document.getElementById("timelineCurrentLabel");
const timelineStartLabel = document.getElementById("timelineStartLabel");
const timelineEndLabel = document.getElementById("timelineEndLabel");
const themeToggleBtn = document.getElementById("themeToggle");
const themeToggleLabel = document.getElementById("themeToggleLabel");
const languageSelect = document.getElementById("languageSelect");

const sampleRateInput = document.getElementById("sampleRate");
const templateSizeInput = document.getElementById("templateSize");
const searchRadiusInput = document.getElementById("searchRadius");
const startTimeInput = document.getElementById("startTime");
const endTimeInput = document.getElementById("endTime");
const playbackRateInput = document.getElementById("playbackRate");
const scaleDistanceInput = document.getElementById("scaleDistance");
const scaleUnitInput = document.getElementById("scaleUnit");
const scaleUnitLabel = document.getElementById("scaleUnitLabel");
const orientationSelect = document.getElementById("orientationMode");
const flipHorizontalInput = document.getElementById("flipHorizontal");
const flipVerticalInput = document.getElementById("flipVertical");

const statusBox = document.getElementById("status");
const canvasHint = document.getElementById("canvasHint");
const selectionStatus = document.getElementById("selectionStatus");
const selectionToast = document.getElementById("selectionToast");
const summaryGrid = document.getElementById("summaryGrid");
const fitToggleInput = document.getElementById("fitToggle");
const fitToggleHint = document.getElementById("fitToggleHint");
const fitPanel = document.getElementById("fitPanel");
const fitSummaryGrid = document.getElementById("fitSummaryGrid");
const video = document.getElementById("sourceVideo");
const canvas = document.getElementById("videoCanvas");
const ctx = canvas.getContext("2d", { willReadFrequently: true });
const tableBody = document.querySelector("#resultsTable tbody");
const tableHeadRow = document.querySelector("#resultsTable thead tr");
const legendFit = document.getElementById("legendFit");

const offscreenCanvas = document.createElement("canvas");
const offscreenCtx = offscreenCanvas.getContext("2d", { willReadFrequently: true });
const themeMediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
const THEME_STORAGE_KEY = "trayectoria-theme";
const LANGUAGE_STORAGE_KEY = "trayectoria-language";
const SUPPORTED_LANGUAGES = ["es", "ca", "gl", "eu", "en"];
const FIT_COLOR = "#3a78b3";

const translations = {
  es: {
    pageTitle: "MotionTrackLab",
    languageLabel: "Idioma",
    languageAuto: "Auto",
    languageEs: "Español",
    languageCa: "Català",
    languageGl: "Galego",
    languageEu: "Euskara",
    languageEn: "English",
    themeDark: "Modo oscuro",
    themeLight: "Modo claro",
    heroEyebrow: "Cinemática para ESO",
    heroTitle: "MotionTrackLab",
    heroLead: "Carga un vídeo, marca la pelota o el objeto y obtén las gráficas de posición horizontal y vertical en función del tiempo.",
    usageLink: "Instrucciones de uso",
    controlsTitle: "1. Configuración",
    videoLabel: "Vídeo",
    videoFieldHelp: "Carga el video que quieres analizar. El objeto debe verse con buen contraste respecto al fondo y la camara no debe moverse durante la grabacion.",
    sampleRateLabel: "Frecuencia de muestreo",
    sampleRateFieldHelp: "Indica cuantas imagenes por segundo se usan para analizar el movimiento.",
    templateSizeLabel: "Tamaño de referencia",
    templateSizeFieldHelp: "Define el tamano del recorte alrededor del objeto que el programa intentara reconocer.",
    searchRadiusLabel: "Ventana de búsqueda",
    searchRadiusFieldHelp: "Marca hasta donde buscara el objeto en el siguiente fotograma.",
    startTimeLabel: "Inicio del análisis",
    startTimeFieldHelp: "Fija el instante desde el que quieres empezar a medir.",
    endTimeLabel: "Fin del análisis",
    endTimeFieldHelp: "Fija el instante en el que terminara el seguimiento.",
    orientationLabel: "Orientación del vídeo",
    orientationFieldHelp: "Ajusta como se muestra el video si fue grabado girado.",
    orientationOriginal: "Original",
    orientationHorizontal: "Horizontal automática",
    orientationVerticalCw: "Vertical girando a la derecha",
    orientationVerticalCcw: "Vertical girando a la izquierda",
    flipHorizontalLabel: "Flip horizontal para que el movimiento vaya de izquierda a derecha",
    flipHorizontalFieldHelp: "Invierte la imagen en horizontal para que el avance quede hacia la derecha.",
    flipVerticalLabel: "Flip vertical",
    flipVerticalFieldHelp: "Invierte la imagen arriba-abajo si el video esta al reves.",
    scaleDistanceLabel: "Distancia real de referencia",
    scaleDistanceFieldHelp: "Es la distancia real entre los dos puntos que usaras para calibrar la escala.",
    scaleUnitTextLabel: "Unidad espacial",
    scaleUnitTextFieldHelp: "Escribe la unidad que quieres usar, por ejemplo m, cm o px si no calibras.",
    helpTitle: "Uso",
    helpStep1: "Carga un vídeo grabado con el móvil o descargado.",
    helpStep2: "Ajusta el instante inicial, final, la velocidad y la orientación si lo necesitas.",
    helpStep3: "Usa <strong>flip horizontal</strong> si quieres que el avance quede de izquierda a derecha.",
    helpStep4: "Muévete por el vídeo con la barra y deja visible el instante que quieres analizar.",
    helpStep5: "Opcionalmente, pulsa <strong>Calibrar escala</strong> y marca dos puntos separados una distancia conocida.",
    helpStep6: "Para seguimiento automático, haz clic sobre la masa o la pelota y pulsa <strong>Iniciar seguimiento</strong>.",
    helpStep7: "Si el automático falla, activa <strong>Modo manual</strong>, reproduce y ve haciendo clic sobre el objeto para dibujar la trayectoria.",
    helpStep8: "Analiza las gráficas, activa si quieres la opcion de mostrar el ajuste teorico y exporta los datos. Las coordenadas se expresan respecto al primer punto del seguimiento.",
    viewerTitle: "2. Selección y seguimiento",
    selectionStatusLabel: "Estado:",
    playerPlayAria: "Reproducir",
    playerPauseAria: "Pausar",
    setStart: "Inicio aquí",
    setEnd: "Fin aquí",
    jumpStart: "Ir al inicio",
    jumpEnd: "Ir al fin",
    reset: "Reiniciar",
    playbackRateLabel: "Velocidad",
    timelineStart: "Inicio: {time}",
    timelineEnd: "Fin: {time}",
    legendTarget: '<i class="dot dot--target"></i>Punto seguido',
    legendPath: '<i class="dot dot--path"></i>Trayectoria',
    legendFit: '<i class="dot dot--fit"></i>Ajuste teórico',
    manualMode: "Modo manual",
    manualModeExit: "Salir manual",
    manualModeHelp: "Permite marcar a mano la posicion del objeto en distintos instantes si el seguimiento automatico falla.",
    calibrateScale: "Calibrar escala",
    calibrateScaleHelp: "Sirve para decirle al programa cuanto mide una distancia real y pasar de pixeles a unidades como metros.",
    startTracking: "Iniciar seguimiento",
    startTrackingHelp: "Hace que el programa siga automaticamente el objeto desde el punto marcado y calcule su trayectoria.",
    statusSelectVideo: "Selecciona un vídeo para empezar.",
    chartsTitle: "3. Gráficas",
    chartXTitle: "Posición horizontal x(t)",
    chartYTitle: "Posición vertical y(t)",
    chartVTitle: "Velocidad instantánea v(t)",
    chartXYTitle: "Recorrido en el plano x-y",
    chartXHelp: "Muestra como cambia la posicion horizontal con el tiempo. Si la linea sube, el objeto avanza hacia la derecha.",
    chartYHelp: "Muestra como cambia la altura con el tiempo. Sirve para ver si el objeto sube, baja o llega a un punto maximo.",
    chartVHelp: "Muestra lo rapido que se mueve el objeto en cada instante. Cuanto mas alto este el valor, mayor es la rapidez.",
    chartXYHelp: "Dibuja la trayectoria vista de lado, usando la posicion horizontal y la vertical a la vez.",
    fitToggleLabel: "Mostrar ajuste teórico",
    fitToggleHint: "Superpone un modelo parabólico ajustado a la trayectoria medida.",
    fitUnavailableHint: "Necesita al menos 3 puntos de seguimiento para calcular el ajuste.",
    fitPanelTitle: "Ajuste teórico",
    fitPanelLead: "Comparativa con un modelo sin rozamiento ajustado a los datos medidos.",
    fitModelLabel: "Modelo",
    fitModelValue: "x(t) = x0 + vx0*t; y(t) = y0 + vy0*t - 0.5*g*t^2",
    fitVxLabel: "Velocidad inicial horizontal",
    fitVyLabel: "Velocidad inicial vertical",
    fitVxHelp: "Es la velocidad horizontal con la que el modelo supone que empieza el movimiento.",
    fitVyHelp: "Es la velocidad vertical con la que el modelo supone que empieza el movimiento.",
    fitGravityLabel: "g ajustada",
    fitRmseLabel: "Error RMS",
    fitGravityHelp: "Es la aceleracion vertical que mejor encaja con la trayectoria del video. Si todo esta bien calibrado, deberia acercarse a 9.8 m/s².",
    fitRmseHelp: "Mide cuanto se separa, de media, el ajuste teorico de los puntos reales. Cuanto mas pequeno, mejor encaja el modelo.",
    infoTooltipLabel: "Explicacion",
    fitMeasuredSeries: "Medida",
    fitAdjustedSeries: "Ajuste",
    summaryTitle: "Resumen",
    summaryDuration: "Tiempo total",
    summaryDx: "Desplazamiento horizontal",
    summaryDy: "Desplazamiento vertical",
    summaryDistance: "Distancia recorrida",
    summaryAverageSpeed: "Rapidez media",
    summaryMaxSpeed: "Velocidad máxima",
    summaryDurationHelp: "Es el tiempo que dura el tramo analizado, desde el primer punto hasta el ultimo.",
    summaryDxHelp: "Indica cuanto se ha movido el objeto en horizontal entre el inicio y el final.",
    summaryDyHelp: "Indica cuanto ha cambiado la altura entre el inicio y el final.",
    summaryDistanceHelp: "Es la longitud total del camino recorrido, sumando todos los pequenos desplazamientos.",
    summaryAverageSpeedHelp: "Es la rapidez media de todo el recorrido: distancia total dividida entre tiempo total.",
    summaryMaxSpeedHelp: "Es la rapidez mas alta alcanzada en algun momento del seguimiento.",
    resultsTitle: "Datos obtenidos",
    exportCsv: "Exportar CSV",
    footerText: '© <a href="https://bilateria.org" target="_blank" rel="noreferrer">Juan José de Haro</a>. Licencia <a href="https://www.gnu.org/licenses/agpl-3.0.html" target="_blank" rel="noreferrer">AGPLv3</a>. <a href="https://github.com/motiontracklab/motiontracklab.github.io/issues" target="_blank" rel="noreferrer">Sugerencias y errores</a>.',
    canvasSelectVideo: "Carga un vídeo y haz clic sobre el objeto.",
    canvasMoveAndMark: "Muévete al instante deseado y marca el objeto.",
    canvasMoveAndClick: "Muévete al instante deseado y haz clic sobre el objeto.",
    canvasManualActive: "Modo manual activo: reproduce y haz clic sobre el objeto para guardar cada posición.",
    canvasCalibrationReady: "Marca dos puntos separados por una distancia conocida.",
    canvasScaleReady: "Escala calibrada. Ahora marca el objeto a seguir.",
    canvasTrackingInProgress: "Seguimiento en curso...",
    canvasTrackingDone: "Seguimiento completado.",
    canvasInitialPointReady: "Punto inicial fijado. Ya puedes iniciar el seguimiento.",
    canvasTransformUpdated: "Transformación actualizada. Haz clic sobre el objeto o vuelve a calibrar si lo necesitas.",
    canvasAtStart: "Estás en el instante inicial. Marca aquí el objeto si quieres usar seguimiento automático.",
    canvasAtEnd: "Estás en el instante final. Comprueba aquí si el tramo termina donde quieres.",
    canvasVideoReady: "Vídeo listo. Ya puedes ajustar orientación, calibrar o hacer clic sobre el objeto.",
    canvasManualFinished: "Modo manual finalizado. Puedes revisar, exportar o seguir ajustando el tramo.",
    canvasManualOff: "Modo manual desactivado. Ya puedes usar el seguimiento automático si quieres.",
    selectionNoPoint: "Todavía no hay punto seleccionado.",
    selectionVideoLoaded: "Vídeo cargado. Ya puedes marcar el punto directamente.",
    selectionManualActive: "Modo manual activo. Reproduce y ve marcando la posición del objeto con clics.",
    selectionManualPoints: "Modo manual: {count} puntos guardados.",
    selectionManualFinished: "Modo manual finalizado con {count} puntos.",
    selectionManualOffNoPoint: "Modo manual desactivado. Todavía no hay punto seleccionado.",
    selectionCalibrationActive: "Calibración activa: marca 2 puntos de referencia en {unit}.",
    selectionCalibrationHalf: "Calibración activa: primer punto marcado, falta el segundo.",
    selectionScaleReady: "Escala calibrada. Ya puedes marcar el objeto a seguir.",
    selectionTrackingInProgress: "Seguimiento en curso.",
    selectionTrackingDone: "Seguimiento completado con {count} puntos.",
    selectionTransformApplied: "Transformación aplicada. Ya puedes marcar el punto sobre la imagen actual.",
    selectionPointReady: "Punto del objeto marcado correctamente. Ya puedes iniciar el seguimiento.",
    toastPointMarked: "Punto marcado",
    toastManualPoint: "Punto manual",
    toastScaleCalibrated: "Escala calibrada",
    toastCalibrationPoint: "Primer punto de calibración",
    statusSelectVideoFirst: "Primero selecciona un vídeo.",
    statusManualOn: "Modo manual activado. Reproduce el vídeo y haz clic sobre el objeto para ir trazando la trayectoria.",
    statusManualOff: "Modo manual desactivado.",
    statusManualFinished: "Seguimiento manual finalizado con {count} puntos.",
    statusManualPointSaved: "Punto manual guardado en t={time}.",
    statusCalibrateMoveVideo: "Coloca primero el vídeo en el instante que quieras calibrar.",
    statusScaleDistancePositive: "La distancia real de referencia debe ser mayor que 0.",
    statusCalibrationOn: "Calibración activada. Marca dos puntos que estén separados {distance} {unit}.",
    statusMarkPointFirst: "Debes marcar primero el punto a seguir.",
    statusProcessingSamples: "Procesando {count} muestras entre {start} y {end}...",
    statusProcessingSample: "Procesando muestra {index} de {count}...",
    statusTrackingDone: "Seguimiento completado con {count} puntos.",
    statusTrackingInterrupted: "Seguimiento interrumpido cerca de t={time}.",
    statusPlayingAtSpeed: "Reproduciendo vídeo a velocidad {speed}x.",
    statusPlaybackReachedEnd: "Reproducción completada hasta el final del tramo.",
    statusPlaybackStopped: "Reproducción detenida.",
    statusPlaybackCompleted: "Reproducción completada.",
    statusVideoLoaded: "Vídeo cargado. Muévete al instante que quieras y haz clic sobre el objeto para marcarlo.",
    statusVideoReadyError: "No se pudo preparar el vídeo.",
    statusResetDone: "Reinicio realizado.",
    statusStartFixed: "Inicio del análisis fijado en {time}.",
    statusEndFixed: "Fin del análisis fijado en {time}. Has vuelto al inicio para marcar el objeto.",
    statusJumpedToStart: "Vídeo colocado en el inicio del análisis ({time}).",
    statusJumpedToEnd: "Vídeo colocado en el final del análisis ({time}).",
    statusScaleUpdated: "Escala actualizada: {value} px por {unit}.",
    statusScaleInvalid: "La calibración no es válida. Prueba con dos puntos distintos.",
    statusCalibrationFirstPoint: "Primer punto de calibración marcado. Haz clic en el segundo punto.",
    statusScaleCalibrated: "Escala calibrada: {value} px por {unit}.",
    statusPointNearEdge: "Elige un punto un poco más alejado del borde del vídeo.",
    statusPointReady: "Punto inicial fijado. Ese punto se usará como origen de coordenadas ({unit}).",
    statusOrientationUpdated: "Orientación o volteo actualizados.",
    statusReadFrameError: "No se pudo leer el vídeo en ese instante.",
    statusLoadVideoError: "No se pudo cargar el vídeo.",
    statusAnalysisRangeError: "El tiempo final debe ser mayor que el tiempo inicial.",
    tableTime: "t (s)",
    tableX: "x ({unit})",
    tableY: "y ({unit})",
    chartTimeAxis: "Tiempo (s)",
    chartXAxis: "x ({unit})",
    chartYAxis: "y ({unit}, hacia arriba)",
    chartVAxis: "v ({unit}/s)",
    csvFilename: "trayectoria.csv",
    csvX: "x_{unit}",
    csvY: "y_{unit}_hacia_arriba"
  },
  ca: {
    pageTitle: "MotionTrackLab",
    languageLabel: "Idioma",
    languageAuto: "Auto",
    languageEs: "Español",
    languageCa: "Català",
    languageGl: "Galego",
    languageEu: "Euskara",
    languageEn: "English",
    themeDark: "Mode fosc",
    themeLight: "Mode clar",
    heroEyebrow: "Cinemàtica per a l'ESO",
    heroTitle: "MotionTrackLab",
    heroLead: "Carrega un vídeo, marca la pilota o l'objecte i obtén les gràfiques de posició horitzontal i vertical en funció del temps.",
    usageLink: "Instruccions d'ús",
    controlsTitle: "1. Configuració",
    videoLabel: "Vídeo",
    videoFieldHelp: "Carrega el video que vols analitzar. L'objecte s'ha de veure amb bon contrast respecte del fons i la camera no s'ha de moure durant la gravacio.",
    sampleRateLabel: "Freqüència de mostreig",
    sampleRateFieldHelp: "Indica quantes imatges per segon s'usen per analitzar el moviment.",
    templateSizeLabel: "Mida de referència",
    templateSizeFieldHelp: "Defineix la mida del retall al voltant de l'objecte que el programa intentara reconeixer.",
    searchRadiusLabel: "Finestra de cerca",
    searchRadiusFieldHelp: "Marca fins on buscara l'objecte al fotograma seguent.",
    startTimeLabel: "Inici de l'anàlisi",
    startTimeFieldHelp: "Fixa l'instant des del qual vols comencar a mesurar.",
    endTimeLabel: "Final de l'anàlisi",
    endTimeFieldHelp: "Fixa l'instant en que acabara el seguiment.",
    orientationLabel: "Orientació del vídeo",
    orientationFieldHelp: "Ajusta com es mostra el video si es va gravar girat.",
    orientationOriginal: "Original",
    orientationHorizontal: "Horitzontal automàtica",
    orientationVerticalCw: "Vertical girant cap a la dreta",
    orientationVerticalCcw: "Vertical girant cap a l'esquerra",
    flipHorizontalLabel: "Flip horitzontal perquè el moviment vagi d'esquerra a dreta",
    flipHorizontalFieldHelp: "Inverteix la imatge en horitzontal perque l'avanc quedi cap a la dreta.",
    flipVerticalLabel: "Flip vertical",
    flipVerticalFieldHelp: "Inverteix la imatge de dalt a baix si el video esta capgirat.",
    scaleDistanceLabel: "Distància real de referència",
    scaleDistanceFieldHelp: "Es la distancia real entre els dos punts que faras servir per calibrar l'escala.",
    scaleUnitTextLabel: "Unitat espacial",
    scaleUnitTextFieldHelp: "Escriu la unitat que vols usar, per exemple m, cm o px si no calibres.",
    helpTitle: "Ús",
    helpStep1: "Carrega un vídeo gravat amb el mòbil o descarregat.",
    helpStep2: "Ajusta l'instant inicial, el final, la velocitat i l'orientació si ho necessites.",
    helpStep3: "Fes servir <strong>flip horitzontal</strong> si vols que l'avanç quedi d'esquerra a dreta.",
    helpStep4: "Mou-te pel vídeo amb la barra i deixa visible l'instant que vols analitzar.",
    helpStep5: "Opcionalment, prem <strong>Calibrar escala</strong> i marca dos punts separats per una distància coneguda.",
    helpStep6: "Per al seguiment automàtic, fes clic sobre la massa o la pilota i prem <strong>Iniciar seguiment</strong>.",
    helpStep7: "Si l'automàtic falla, activa <strong>Mode manual</strong>, reprodueix i ves fent clic sobre l'objecte per dibuixar la trajectòria.",
    helpStep8: "Analitza les gràfiques, activa si vols l'opcio de mostrar l'ajust teoric i exporta les dades. Les coordenades s'expressen respecte del primer punt del seguiment.",
    viewerTitle: "2. Selecció i seguiment",
    selectionStatusLabel: "Estat:",
    playerPlayAria: "Reprodueix",
    playerPauseAria: "Pausa",
    setStart: "Inici aquí",
    setEnd: "Final aquí",
    jumpStart: "Ves a l'inici",
    jumpEnd: "Ves al final",
    reset: "Reinicia",
    playbackRateLabel: "Velocitat",
    timelineStart: "Inici: {time}",
    timelineEnd: "Final: {time}",
    legendTarget: '<i class="dot dot--target"></i>Punt seguit',
    legendPath: '<i class="dot dot--path"></i>Trajectòria',
    legendFit: '<i class="dot dot--fit"></i>Ajust teòric',
    manualMode: "Mode manual",
    manualModeExit: "Surt del manual",
    manualModeHelp: "Permet marcar a ma la posicio de l'objecte en diferents instants si el seguiment automatic falla.",
    calibrateScale: "Calibrar escala",
    calibrateScaleHelp: "Serveix per dir al programa quant mesura una distancia real i passar de pixels a unitats com metres.",
    startTracking: "Iniciar seguiment",
    startTrackingHelp: "Fa que el programa segueixi automaticament l'objecte des del punt marcat i calculi la trajectoria.",
    statusSelectVideo: "Selecciona un vídeo per començar.",
    chartsTitle: "3. Gràfiques",
    chartXTitle: "Posició horitzontal x(t)",
    chartYTitle: "Posició vertical y(t)",
    chartVTitle: "Velocitat instantània v(t)",
    chartXYTitle: "Recorregut en el pla x-y",
    chartXHelp: "Mostra com canvia la posicio horitzontal amb el temps. Si la linia puja, l'objecte avanca cap a la dreta.",
    chartYHelp: "Mostra com canvia l'altura amb el temps. Serveix per veure si l'objecte puja, baixa o arriba a un punt maxim.",
    chartVHelp: "Mostra com de rapid es mou l'objecte en cada instant. Com mes alt sigui el valor, mes gran es la rapidesa.",
    chartXYHelp: "Dibuixa la trajectoria vista de costat, fent servir alhora la posicio horitzontal i la vertical.",
    fitToggleLabel: "Mostra l'ajust teòric",
    fitToggleHint: "Superposa un model parabòlic ajustat a la trajectòria mesurada.",
    fitUnavailableHint: "Calen almenys 3 punts de seguiment per calcular l'ajust.",
    fitPanelTitle: "Ajust teòric",
    fitPanelLead: "Comparativa amb un model sense fregament ajustat a les dades mesurades.",
    fitModelLabel: "Model",
    fitModelValue: "x(t) = x0 + vx0*t; y(t) = y0 + vy0*t - 0.5*g*t^2",
    fitVxLabel: "Velocitat inicial horitzontal",
    fitVyLabel: "Velocitat inicial vertical",
    fitVxHelp: "Es la velocitat horitzontal amb que el model suposa que comenca el moviment.",
    fitVyHelp: "Es la velocitat vertical amb que el model suposa que comenca el moviment.",
    fitGravityLabel: "g ajustada",
    fitRmseLabel: "Error RMS",
    fitGravityHelp: "Es l'acceleracio vertical que encaixa millor amb la trajectoria del video. Si tot esta ben calibrat, hauria d'apropar-se a 9.8 m/s².",
    fitRmseHelp: "Mesura quant se separa, de mitjana, l'ajust teoric dels punts reals. Com mes petit, millor encaixa el model.",
    infoTooltipLabel: "Explicacio",
    fitMeasuredSeries: "Mesura",
    fitAdjustedSeries: "Ajust",
    summaryTitle: "Resum",
    summaryDuration: "Temps total",
    summaryDx: "Desplaçament horitzontal",
    summaryDy: "Desplaçament vertical",
    summaryDistance: "Distància recorreguda",
    summaryAverageSpeed: "Rapidesa mitjana",
    summaryMaxSpeed: "Velocitat màxima",
    summaryDurationHelp: "Es el temps que dura el tram analitzat, des del primer punt fins a l'ultim.",
    summaryDxHelp: "Indica quant s'ha mogut l'objecte en horitzontal entre l'inici i el final.",
    summaryDyHelp: "Indica quant ha canviat l'altura entre l'inici i el final.",
    summaryDistanceHelp: "Es la longitud total del cami recorregut, sumant tots els petits desplacaments.",
    summaryAverageSpeedHelp: "Es la rapidesa mitjana de tot el recorregut: distancia total dividida pel temps total.",
    summaryMaxSpeedHelp: "Es la rapidesa mes alta assolida en algun moment del seguiment.",
    resultsTitle: "Dades obtingudes",
    exportCsv: "Exporta CSV",
    footerText: '© <a href="https://bilateria.org" target="_blank" rel="noreferrer">Juan José de Haro</a>. Llicència <a href="https://www.gnu.org/licenses/agpl-3.0.html" target="_blank" rel="noreferrer">AGPLv3</a>. <a href="https://github.com/motiontracklab/motiontracklab.github.io/issues" target="_blank" rel="noreferrer">Suggeriments i errors</a>.',
    canvasSelectVideo: "Carrega un vídeo i fes clic sobre l'objecte.",
    canvasMoveAndMark: "Mou-te fins a l'instant desitjat i marca l'objecte.",
    canvasMoveAndClick: "Mou-te fins a l'instant desitjat i fes clic sobre l'objecte.",
    canvasManualActive: "Mode manual actiu: reprodueix i fes clic sobre l'objecte per desar cada posició.",
    canvasCalibrationReady: "Marca dos punts separats per una distància coneguda.",
    canvasScaleReady: "Escala calibrada. Ara marca l'objecte a seguir.",
    canvasTrackingInProgress: "Seguiment en curs...",
    canvasTrackingDone: "Seguiment completat.",
    canvasInitialPointReady: "Punt inicial fixat. Ja pots iniciar el seguiment.",
    canvasTransformUpdated: "Transformació actualitzada. Fes clic sobre l'objecte o torna a calibrar si ho necessites.",
    canvasAtStart: "Ets a l'instant inicial. Marca aquí l'objecte si vols fer servir seguiment automàtic.",
    canvasAtEnd: "Ets a l'instant final. Comprova aquí si el tram acaba on vols.",
    canvasVideoReady: "Vídeo llest. Ja pots ajustar l'orientació, calibrar o fer clic sobre l'objecte.",
    canvasManualFinished: "Mode manual finalitzat. Pots revisar, exportar o continuar ajustant el tram.",
    canvasManualOff: "Mode manual desactivat. Ja pots fer servir el seguiment automàtic si vols.",
    selectionNoPoint: "Encara no hi ha cap punt seleccionat.",
    selectionVideoLoaded: "Vídeo carregat. Ja pots marcar el punt directament.",
    selectionManualActive: "Mode manual actiu. Reprodueix i ves marcant la posició de l'objecte amb clics.",
    selectionManualPoints: "Mode manual: {count} punts desats.",
    selectionManualFinished: "Mode manual finalitzat amb {count} punts.",
    selectionManualOffNoPoint: "Mode manual desactivat. Encara no hi ha cap punt seleccionat.",
    selectionCalibrationActive: "Calibratge actiu: marca 2 punts de referència en {unit}.",
    selectionCalibrationHalf: "Calibratge actiu: primer punt marcat, en falta el segon.",
    selectionScaleReady: "Escala calibrada. Ja pots marcar l'objecte a seguir.",
    selectionTrackingInProgress: "Seguiment en curs.",
    selectionTrackingDone: "Seguiment completat amb {count} punts.",
    selectionTransformApplied: "Transformació aplicada. Ja pots marcar el punt sobre la imatge actual.",
    selectionPointReady: "Punt de l'objecte marcat correctament. Ja pots iniciar el seguiment.",
    toastPointMarked: "Punt marcat",
    toastManualPoint: "Punt manual",
    toastScaleCalibrated: "Escala calibrada",
    toastCalibrationPoint: "Primer punt de calibratge",
    statusSelectVideoFirst: "Primer selecciona un vídeo.",
    statusManualOn: "Mode manual activat. Reprodueix el vídeo i fes clic sobre l'objecte per anar traçant la trajectòria.",
    statusManualOff: "Mode manual desactivat.",
    statusManualFinished: "Seguiment manual finalitzat amb {count} punts.",
    statusManualPointSaved: "Punt manual desat a t={time}.",
    statusCalibrateMoveVideo: "Col·loca primer el vídeo a l'instant que vulguis calibrar.",
    statusScaleDistancePositive: "La distància real de referència ha de ser més gran que 0.",
    statusCalibrationOn: "Calibratge activat. Marca dos punts que estiguin separats {distance} {unit}.",
    statusMarkPointFirst: "Has de marcar primer el punt que vols seguir.",
    statusProcessingSamples: "Processant {count} mostres entre {start} i {end}...",
    statusProcessingSample: "Processant mostra {index} de {count}...",
    statusTrackingDone: "Seguiment completat amb {count} punts.",
    statusTrackingInterrupted: "Seguiment interromput a prop de t={time}.",
    statusPlayingAtSpeed: "Reproduint vídeo a velocitat {speed}x.",
    statusPlaybackReachedEnd: "Reproducció completada fins al final del tram.",
    statusPlaybackStopped: "Reproducció aturada.",
    statusPlaybackCompleted: "Reproducció completada.",
    statusVideoLoaded: "Vídeo carregat. Mou-te fins a l'instant que vulguis i fes clic sobre l'objecte per marcar-lo.",
    statusVideoReadyError: "No s'ha pogut preparar el vídeo.",
    statusResetDone: "Reinici fet.",
    statusStartFixed: "Inici de l'anàlisi fixat a {time}.",
    statusEndFixed: "Final de l'anàlisi fixat a {time}. Has tornat a l'inici per marcar l'objecte.",
    statusJumpedToStart: "Vídeo col·locat a l'inici de l'anàlisi ({time}).",
    statusJumpedToEnd: "Vídeo col·locat al final de l'anàlisi ({time}).",
    statusScaleUpdated: "Escala actualitzada: {value} px per {unit}.",
    statusScaleInvalid: "El calibratge no és vàlid. Prova-ho amb dos punts diferents.",
    statusCalibrationFirstPoint: "Primer punt de calibratge marcat. Fes clic al segon punt.",
    statusScaleCalibrated: "Escala calibrada: {value} px per {unit}.",
    statusPointNearEdge: "Tria un punt una mica més allunyat de la vora del vídeo.",
    statusPointReady: "Punt inicial fixat. Aquest punt es farà servir com a origen de coordenades ({unit}).",
    statusOrientationUpdated: "Orientació o gir actualitzats.",
    statusReadFrameError: "No s'ha pogut llegir el vídeo en aquest instant.",
    statusLoadVideoError: "No s'ha pogut carregar el vídeo.",
    statusAnalysisRangeError: "El temps final ha de ser més gran que el temps inicial.",
    tableTime: "t (s)",
    tableX: "x ({unit})",
    tableY: "y ({unit})",
    chartTimeAxis: "Temps (s)",
    chartXAxis: "x ({unit})",
    chartYAxis: "y ({unit}, cap amunt)",
    chartVAxis: "v ({unit}/s)",
    csvFilename: "trajectoria.csv",
    csvX: "x_{unit}",
    csvY: "y_{unit}_cap_amunt"
  },
  gl: {
    pageTitle: "MotionTrackLab",
    languageLabel: "Idioma",
    languageAuto: "Auto",
    languageEs: "Español",
    languageCa: "Català",
    languageGl: "Galego",
    languageEu: "Euskara",
    languageEn: "English",
    themeDark: "Modo escuro",
    themeLight: "Modo claro",
    heroEyebrow: "Cinemática para a ESO",
    heroTitle: "MotionTrackLab",
    heroLead: "Carga un vídeo, marca a pelota ou o obxecto e obtén as gráficas de posición horizontal e vertical en función do tempo.",
    usageLink: "Instrucións de uso",
    controlsTitle: "1. Configuración",
    videoLabel: "Vídeo",
    videoFieldHelp: "Carga o video que queres analizar. O obxecto debe verse con bo contraste respecto do fondo e a camara non debe moverse durante a gravacion.",
    sampleRateLabel: "Frecuencia de mostraxe",
    sampleRateFieldHelp: "Indica cantas imaxes por segundo se usan para analizar o movemento.",
    templateSizeLabel: "Tamaño de referencia",
    templateSizeFieldHelp: "Define o tamaño do recorte arredor do obxecto que o programa intentara recoñecer.",
    searchRadiusLabel: "Xanela de busca",
    searchRadiusFieldHelp: "Marca ata onde buscara o obxecto no seguinte fotograma.",
    startTimeLabel: "Inicio da análise",
    startTimeFieldHelp: "Fixa o instante desde o que queres comezar a medir.",
    endTimeLabel: "Fin da análise",
    endTimeFieldHelp: "Fixa o instante no que rematara o seguimento.",
    orientationLabel: "Orientación do vídeo",
    orientationFieldHelp: "Axusta como se mostra o video se foi gravado xirado.",
    orientationOriginal: "Orixinal",
    orientationHorizontal: "Horizontal automática",
    orientationVerticalCw: "Vertical xirando á dereita",
    orientationVerticalCcw: "Vertical xirando á esquerda",
    flipHorizontalLabel: "Flip horizontal para que o movemento vaia de esquerda a dereita",
    flipHorizontalFieldHelp: "Invierte a imaxe en horizontal para que o avance quede cara á dereita.",
    flipVerticalLabel: "Flip vertical",
    flipVerticalFieldHelp: "Invierte a imaxe arriba-abaixo se o video esta do reves.",
    scaleDistanceLabel: "Distancia real de referencia",
    scaleDistanceFieldHelp: "E a distancia real entre os dous puntos que usaras para calibrar a escala.",
    scaleUnitTextLabel: "Unidade espacial",
    scaleUnitTextFieldHelp: "Escribe a unidade que queres usar, por exemplo m, cm ou px se non calibras.",
    helpTitle: "Uso",
    helpStep1: "Carga un vídeo gravado co móbil ou descargado.",
    helpStep2: "Axusta o instante inicial, final, a velocidade e a orientación se o precisas.",
    helpStep3: "Usa <strong>flip horizontal</strong> se queres que o avance quede de esquerda a dereita.",
    helpStep4: "Móvete polo vídeo coa barra e deixa visible o instante que queres analizar.",
    helpStep5: "Opcionalmente, preme <strong>Calibrar escala</strong> e marca dous puntos separados por unha distancia coñecida.",
    helpStep6: "Para seguimento automático, fai clic sobre a masa ou a pelota e preme <strong>Iniciar seguimento</strong>.",
    helpStep7: "Se o automático falla, activa <strong>Modo manual</strong>, reproduce e vai facendo clic sobre o obxecto para debuxar a traxectoria.",
    helpStep8: "Analiza as gráficas, activa se queres a opcion de mostrar o axuste teorico e exporta os datos. As coordenadas exprésanse respecto do primeiro punto do seguimento.",
    viewerTitle: "2. Selección e seguimento",
    selectionStatusLabel: "Estado:",
    playerPlayAria: "Reproducir",
    playerPauseAria: "Pausar",
    setStart: "Inicio aquí",
    setEnd: "Fin aquí",
    jumpStart: "Ir ao inicio",
    jumpEnd: "Ir ao fin",
    reset: "Reiniciar",
    playbackRateLabel: "Velocidade",
    timelineStart: "Inicio: {time}",
    timelineEnd: "Fin: {time}",
    legendTarget: '<i class="dot dot--target"></i>Punto seguido',
    legendPath: '<i class="dot dot--path"></i>Traxectoria',
    legendFit: '<i class="dot dot--fit"></i>Ajuste teórico',
    manualMode: "Modo manual",
    manualModeExit: "Saír do manual",
    manualModeHelp: "Permite marcar a man a posicion do obxecto en distintos instantes se o seguimento automatico falla.",
    calibrateScale: "Calibrar escala",
    calibrateScaleHelp: "Serve para dicirlle ao programa canto mide unha distancia real e pasar de pixeles a unidades como metros.",
    startTracking: "Iniciar seguimento",
    startTrackingHelp: "Fai que o programa siga automaticamente o obxecto desde o punto marcado e calcule a sua traxectoria.",
    statusSelectVideo: "Selecciona un vídeo para comezar.",
    chartsTitle: "3. Gráficas",
    chartXTitle: "Posición horizontal x(t)",
    chartYTitle: "Posición vertical y(t)",
    chartVTitle: "Velocidade instantánea v(t)",
    chartXYTitle: "Percorrido no plano x-y",
    chartXHelp: "Mostra como cambia a posicion horizontal co tempo. Se a liña sobe, o obxecto avanza cara á dereita.",
    chartYHelp: "Mostra como cambia a altura co tempo. Serve para ver se o obxecto sobe, baixa ou chega a un punto maximo.",
    chartVHelp: "Mostra o rapido que se move o obxecto en cada instante. Canto mais alto sexa o valor, maior e a rapidez.",
    chartXYHelp: "Debuxa a traxectoria vista de lado, usando a posicion horizontal e a vertical ao mesmo tempo.",
    fitToggleLabel: "Mostrar axuste teórico",
    fitToggleHint: "Superpón un modelo parabólico axustado á traxectoria medida.",
    fitUnavailableHint: "Fan falta polo menos 3 puntos de seguimento para calcular o axuste.",
    fitPanelTitle: "Axuste teórico",
    fitPanelLead: "Comparativa cun modelo sen rozamento axustado aos datos medidos.",
    fitModelLabel: "Modelo",
    fitModelValue: "x(t) = x0 + vx0*t; y(t) = y0 + vy0*t - 0.5*g*t^2",
    fitVxLabel: "Velocidade inicial horizontal",
    fitVyLabel: "Velocidade inicial vertical",
    fitVxHelp: "E a velocidade horizontal coa que o modelo supón que comeza o movemento.",
    fitVyHelp: "E a velocidade vertical coa que o modelo supón que comeza o movemento.",
    fitGravityLabel: "g axustada",
    fitRmseLabel: "Erro RMS",
    fitGravityHelp: "E a aceleracion vertical que mellor encaixa coa traxectoria do video. Se todo esta ben calibrado, deberia achegarse a 9.8 m/s².",
    fitRmseHelp: "Mide canto se separa, de media, o axuste teorico dos puntos reais. Canto mais pequeno, mellor encaixa o modelo.",
    infoTooltipLabel: "Explicacion",
    fitMeasuredSeries: "Medida",
    fitAdjustedSeries: "Axuste",
    summaryTitle: "Resumo",
    summaryDuration: "Tempo total",
    summaryDx: "Desprazamento horizontal",
    summaryDy: "Desprazamento vertical",
    summaryDistance: "Distancia percorrida",
    summaryAverageSpeed: "Rapidez media",
    summaryMaxSpeed: "Velocidade máxima",
    summaryDurationHelp: "E o tempo que dura o tramo analizado, desde o primeiro punto ata o ultimo.",
    summaryDxHelp: "Indica canto se moveu o obxecto en horizontal entre o inicio e o final.",
    summaryDyHelp: "Indica canto cambiou a altura entre o inicio e o final.",
    summaryDistanceHelp: "E a lonxitude total do camiño percorrido, sumando todos os pequenos desprazamentos.",
    summaryAverageSpeedHelp: "E a rapidez media de todo o percorrido: distancia total dividida entre tempo total.",
    summaryMaxSpeedHelp: "E a rapidez mais alta alcanzada nalgún momento do seguimento.",
    resultsTitle: "Datos obtidos",
    exportCsv: "Exportar CSV",
    footerText: '© <a href="https://bilateria.org" target="_blank" rel="noreferrer">Juan José de Haro</a>. Licenza <a href="https://www.gnu.org/licenses/agpl-3.0.html" target="_blank" rel="noreferrer">AGPLv3</a>. <a href="https://github.com/motiontracklab/motiontracklab.github.io/issues" target="_blank" rel="noreferrer">Suxestións e erros</a>.',
    canvasSelectVideo: "Carga un vídeo e fai clic sobre o obxecto.",
    canvasMoveAndMark: "Móvete ao instante desexado e marca o obxecto.",
    canvasMoveAndClick: "Móvete ao instante desexado e fai clic sobre o obxecto.",
    canvasManualActive: "Modo manual activo: reproduce e fai clic sobre o obxecto para gardar cada posición.",
    canvasCalibrationReady: "Marca dous puntos separados por unha distancia coñecida.",
    canvasScaleReady: "Escala calibrada. Agora marca o obxecto que hai que seguir.",
    canvasTrackingInProgress: "Seguimento en curso...",
    canvasTrackingDone: "Seguimento completado.",
    canvasInitialPointReady: "Punto inicial fixado. Xa podes iniciar o seguimento.",
    canvasTransformUpdated: "Transformación actualizada. Fai clic sobre o obxecto ou volve calibrar se o precisas.",
    canvasAtStart: "Estás no instante inicial. Marca aquí o obxecto se queres usar seguimento automático.",
    canvasAtEnd: "Estás no instante final. Comproba aquí se o tramo remata onde queres.",
    canvasVideoReady: "Vídeo listo. Xa podes axustar orientación, calibrar ou facer clic sobre o obxecto.",
    canvasManualFinished: "Modo manual finalizado. Podes revisar, exportar ou seguir axustando o tramo.",
    canvasManualOff: "Modo manual desactivado. Xa podes usar o seguimento automático se queres.",
    selectionNoPoint: "Aínda non hai ningún punto seleccionado.",
    selectionVideoLoaded: "Vídeo cargado. Xa podes marcar o punto directamente.",
    selectionManualActive: "Modo manual activo. Reproduce e vai marcando a posición do obxecto con clics.",
    selectionManualPoints: "Modo manual: {count} puntos gardados.",
    selectionManualFinished: "Modo manual finalizado con {count} puntos.",
    selectionManualOffNoPoint: "Modo manual desactivado. Aínda non hai ningún punto seleccionado.",
    selectionCalibrationActive: "Calibración activa: marca 2 puntos de referencia en {unit}.",
    selectionCalibrationHalf: "Calibración activa: primeiro punto marcado, falta o segundo.",
    selectionScaleReady: "Escala calibrada. Xa podes marcar o obxecto que hai que seguir.",
    selectionTrackingInProgress: "Seguimento en curso.",
    selectionTrackingDone: "Seguimento completado con {count} puntos.",
    selectionTransformApplied: "Transformación aplicada. Xa podes marcar o punto sobre a imaxe actual.",
    selectionPointReady: "Punto do obxecto marcado correctamente. Xa podes iniciar o seguimento.",
    toastPointMarked: "Punto marcado",
    toastManualPoint: "Punto manual",
    toastScaleCalibrated: "Escala calibrada",
    toastCalibrationPoint: "Primeiro punto de calibración",
    statusSelectVideoFirst: "Primeiro selecciona un vídeo.",
    statusManualOn: "Modo manual activado. Reproduce o vídeo e fai clic sobre o obxecto para ir trazando a traxectoria.",
    statusManualOff: "Modo manual desactivado.",
    statusManualFinished: "Seguimento manual finalizado con {count} puntos.",
    statusManualPointSaved: "Punto manual gardado en t={time}.",
    statusCalibrateMoveVideo: "Coloca primeiro o vídeo no instante que queiras calibrar.",
    statusScaleDistancePositive: "A distancia real de referencia debe ser maior ca 0.",
    statusCalibrationOn: "Calibración activada. Marca dous puntos que estean separados {distance} {unit}.",
    statusMarkPointFirst: "Debes marcar primeiro o punto que hai que seguir.",
    statusProcessingSamples: "Procesando {count} mostras entre {start} e {end}...",
    statusProcessingSample: "Procesando mostra {index} de {count}...",
    statusTrackingDone: "Seguimento completado con {count} puntos.",
    statusTrackingInterrupted: "Seguimento interrompido preto de t={time}.",
    statusPlayingAtSpeed: "Reproducindo vídeo á velocidade {speed}x.",
    statusPlaybackReachedEnd: "Reprodución completada ata o final do tramo.",
    statusPlaybackStopped: "Reprodución detida.",
    statusPlaybackCompleted: "Reprodución completada.",
    statusVideoLoaded: "Vídeo cargado. Móvete ao instante que queiras e fai clic sobre o obxecto para marcalo.",
    statusVideoReadyError: "Non se puido preparar o vídeo.",
    statusResetDone: "Reinicio realizado.",
    statusStartFixed: "Inicio da análise fixado en {time}.",
    statusEndFixed: "Fin da análise fixado en {time}. Volviches ao inicio para marcar o obxecto.",
    statusJumpedToStart: "Vídeo colocado no inicio da análise ({time}).",
    statusJumpedToEnd: "Vídeo colocado no final da análise ({time}).",
    statusScaleUpdated: "Escala actualizada: {value} px por {unit}.",
    statusScaleInvalid: "A calibración non é válida. Proba con dous puntos distintos.",
    statusCalibrationFirstPoint: "Primeiro punto de calibración marcado. Fai clic no segundo punto.",
    statusScaleCalibrated: "Escala calibrada: {value} px por {unit}.",
    statusPointNearEdge: "Escolle un punto un pouco máis afastado do bordo do vídeo.",
    statusPointReady: "Punto inicial fixado. Ese punto usarase como orixe de coordenadas ({unit}).",
    statusOrientationUpdated: "Orientación ou xiro actualizados.",
    statusReadFrameError: "Non se puido ler o vídeo nese instante.",
    statusLoadVideoError: "Non se puido cargar o vídeo.",
    statusAnalysisRangeError: "O tempo final debe ser maior ca o tempo inicial.",
    tableTime: "t (s)",
    tableX: "x ({unit})",
    tableY: "y ({unit})",
    chartTimeAxis: "Tempo (s)",
    chartXAxis: "x ({unit})",
    chartYAxis: "y ({unit}, cara arriba)",
    chartVAxis: "v ({unit}/s)",
    csvFilename: "traxectoria.csv",
    csvX: "x_{unit}",
    csvY: "y_{unit}_cara_arriba"
  },
  eu: {
    pageTitle: "MotionTrackLab",
    languageLabel: "Hizkuntza",
    languageAuto: "Auto",
    languageEs: "Español",
    languageCa: "Català",
    languageGl: "Galego",
    languageEu: "Euskara",
    languageEn: "English",
    themeDark: "Modu iluna",
    themeLight: "Modu argia",
    heroEyebrow: "DBHrako zinematika",
    heroTitle: "MotionTrackLab",
    heroLead: "Kargatu bideo bat, markatu pilota edo objektua, eta lortu posizio horizontalaren eta bertikalaren grafikoak denboraren arabera.",
    usageLink: "Erabilera-argibideak",
    controlsTitle: "1. Konfigurazioa",
    videoLabel: "Bideoa",
    videoFieldHelp: "Aztertu nahi duzun bideoa kargatu. Objektua atzeko planoarekiko kontraste onarekin ikusi behar da, eta kamerak ezin du mugitu grabazioan.",
    sampleRateLabel: "Laginketa-maiztasuna",
    sampleRateFieldHelp: "Mugimendua aztertzeko segundo bakoitzeko zenbat irudi erabiltzen diren adierazten du.",
    templateSizeLabel: "Erreferentzia-tamaina",
    templateSizeFieldHelp: "Programak ezagutzen saiatuko den objektuaren inguruko mozketa-tamaina definitzen du.",
    searchRadiusLabel: "Bilaketa-leihoa",
    searchRadiusFieldHelp: "Hurrengo fotograman objektua noraino bilatuko duen adierazten du.",
    startTimeLabel: "Analisiaren hasiera",
    startTimeFieldHelp: "Neurtzen hasi nahi duzun unea finkatzen du.",
    endTimeLabel: "Analisiaren amaiera",
    endTimeFieldHelp: "Jarraipena noiz amaituko den finkatzen du.",
    orientationLabel: "Bideoaren orientazioa",
    orientationFieldHelp: "Bideoa biratuta grabatu bada nola erakusten den doitzen du.",
    orientationOriginal: "Jatorrizkoa",
    orientationHorizontal: "Horizontal automatikoa",
    orientationVerticalCw: "Bertikala eskuinera biratuta",
    orientationVerticalCcw: "Bertikala ezkerrera biratuta",
    flipHorizontalLabel: "Flip horizontala mugimendua ezkerretik eskuinera joan dadin",
    flipHorizontalFieldHelp: "Irudia horizontalean iraulita erakusten du aurrerapena eskuinerantz gera dadin.",
    flipVerticalLabel: "Flip bertikala",
    flipVerticalFieldHelp: "Bideoa buruz behera badago, irudia goitik behera iraultzen du.",
    scaleDistanceLabel: "Erreferentziako benetako distantzia",
    scaleDistanceFieldHelp: "Eskala kalibratzeko erabiliko dituzun bi puntuen arteko benetako distantzia da.",
    scaleUnitTextLabel: "Espazio-unitatea",
    scaleUnitTextFieldHelp: "Idatzi erabili nahi duzun unitatea, adibidez m, cm edo px kalibratzen ez baduzu.",
    helpTitle: "Erabilera",
    helpStep1: "Kargatu mugikorrarekin grabatutako edo deskargatutako bideo bat.",
    helpStep2: "Doitu hasierako eta amaierako unea, abiadura eta orientazioa behar baduzu.",
    helpStep3: "Erabili <strong>flip horizontala</strong> aurrerapena ezkerretik eskuinera geratzea nahi baduzu.",
    helpStep4: "Mugitu bideoan barraren bidez eta utzi ikusgai aztertu nahi duzun unea.",
    helpStep5: "Aukeran, sakatu <strong>Eskala kalibratu</strong> eta markatu distantzia ezagun batez bereizitako bi puntu.",
    helpStep6: "Jarraipen automatikoa egiteko, egin klik masaren edo pilotaren gainean eta sakatu <strong>Jarraipena hasi</strong>.",
    helpStep7: "Automatikoak huts egiten badu, aktibatu <strong>Eskuzko modua</strong>, erreproduzitu eta egin klik objektuan ibilbidea marrazteko.",
    helpStep8: "Aztertu grafikoak, nahi baduzu aktibatu doikuntza teorikoa erakusteko aukera, eta esportatu datuak. Koordenatuak jarraipeneko lehen puntuarekiko adierazten dira.",
    viewerTitle: "2. Hautaketa eta jarraipena",
    selectionStatusLabel: "Egoera:",
    playerPlayAria: "Erreproduzitu",
    playerPauseAria: "Pausatu",
    setStart: "Hasiera hemen",
    setEnd: "Amaiera hemen",
    jumpStart: "Joan hasierara",
    jumpEnd: "Joan amaierara",
    reset: "Berrezarri",
    playbackRateLabel: "Abiadura",
    timelineStart: "Hasiera: {time}",
    timelineEnd: "Amaiera: {time}",
    legendTarget: '<i class="dot dot--target"></i>Jarraitutako puntua',
    legendPath: '<i class="dot dot--path"></i>Ibilbidea',
    legendFit: '<i class="dot dot--fit"></i>Doikuntza teorikoa',
    manualMode: "Eskuzko modua",
    manualModeExit: "Irten eskuzkotik",
    manualModeHelp: "Jarraipen automatikoak huts egiten badu, objektuaren posizioa eskuz markatzeko balio du.",
    calibrateScale: "Eskala kalibratu",
    calibrateScaleHelp: "Programari benetako distantzia batek zenbat neurtzen duen esateko balio du, pixelak metro bezalako unitateetara pasatzeko.",
    startTracking: "Jarraipena hasi",
    startTrackingHelp: "Programak markatutako puntutik aurrera objektua automatikoki jarrai dezan eta ibilbidea kalkula dezan egiten du.",
    statusSelectVideo: "Hautatu bideo bat hasteko.",
    chartsTitle: "3. Grafikoak",
    chartXTitle: "Posizio horizontala x(t)",
    chartYTitle: "Posizio bertikala y(t)",
    chartVTitle: "Berehalako abiadura v(t)",
    chartXYTitle: "Ibilbidea x-y planoan",
    chartXHelp: "Denborarekin posizio horizontala nola aldatzen den erakusten du. Lerroa gora badoa, objektua eskuinerantz doa.",
    chartYHelp: "Altura denborarekin nola aldatzen den erakusten du. Objektua igotzen, jaisten edo puntu gorenera iristen den ikusteko balio du.",
    chartVHelp: "Objektua une bakoitzean zenbateko lastertasunez mugitzen den erakusten du. Balioa zenbat eta handiagoa izan, orduan eta handiagoa da abiadura.",
    chartXYHelp: "Ibilbidea albotik marrazten du, posizio horizontala eta bertikala batera erabiliz.",
    fitToggleLabel: "Erakutsi doikuntza teorikoa",
    fitToggleHint: "Neurtutako ibilbidera egokitutako eredu parabolikoa gainjartzen du.",
    fitUnavailableHint: "Gutxienez 3 jarraipen-puntu behar dira doikuntza kalkulatzeko.",
    fitPanelTitle: "Doikuntza teorikoa",
    fitPanelLead: "Neurtutako datuetara egokitutako marruskadurarik gabeko ereduarekin alderaketa.",
    fitModelLabel: "Eredua",
    fitModelValue: "x(t) = x0 + vx0*t; y(t) = y0 + vy0*t - 0.5*g*t^2",
    fitVxLabel: "Hasierako abiadura horizontala",
    fitVyLabel: "Hasierako abiadura bertikala",
    fitVxHelp: "Ereduak mugimendua hastean duen abiadura horizontala da.",
    fitVyHelp: "Ereduak mugimendua hastean duen abiadura bertikala da.",
    fitGravityLabel: "g doitua",
    fitRmseLabel: "RMS errorea",
    fitGravityHelp: "Bideoaren ibilbidearekin ondoen egokitzen den azelerazio bertikala da. Dena ondo kalibratuta badago, 9.8 m/s² inguruan egon beharko luke.",
    fitRmseHelp: "Doikuntza teorikoa benetako puntuetatik batez beste zenbat urruntzen den neurtzen du. Zenbat eta txikiagoa, orduan eta hobea da eredua.",
    infoTooltipLabel: "Azalpena",
    fitMeasuredSeries: "Neurtua",
    fitAdjustedSeries: "Doikuntza",
    summaryTitle: "Laburpena",
    summaryDuration: "Denbora osoa",
    summaryDx: "Desplazamendu horizontala",
    summaryDy: "Desplazamendu bertikala",
    summaryDistance: "Egindako distantzia",
    summaryAverageSpeed: "Batez besteko abiadura",
    summaryMaxSpeed: "Abiadura maximoa",
    summaryDurationHelp: "Aztertutako zatiak zenbat irauten duen da, lehen puntutik azkenera.",
    summaryDxHelp: "Hasieraren eta amaieraren artean objektua horizontalean zenbat mugitu den adierazten du.",
    summaryDyHelp: "Hasieraren eta amaieraren artean altuera zenbat aldatu den adierazten du.",
    summaryDistanceHelp: "Egindako bide osoaren luzera da, desplazamendu txiki guztiak batuta.",
    summaryAverageSpeedHelp: "Ibilbide osoaren batez besteko abiadura da: distantzia osoa denbora osoarekin zatituta.",
    summaryMaxSpeedHelp: "Jarraipeneko uneren batean lortutako abiadurarik handiena da.",
    resultsTitle: "Lortutako datuak",
    exportCsv: "CSV esportatu",
    footerText: '© <a href="https://bilateria.org" target="_blank" rel="noreferrer">Juan José de Haro</a>. <a href="https://www.gnu.org/licenses/agpl-3.0.html" target="_blank" rel="noreferrer">AGPLv3</a> lizentzia. <a href="https://github.com/motiontracklab/motiontracklab.github.io/issues" target="_blank" rel="noreferrer">Iradokizunak eta erroreak</a>.',
    canvasSelectVideo: "Kargatu bideo bat eta egin klik objektuaren gainean.",
    canvasMoveAndMark: "Mugitu nahi duzun unera eta markatu objektua.",
    canvasMoveAndClick: "Mugitu nahi duzun unera eta egin klik objektuaren gainean.",
    canvasManualActive: "Eskuzko modua aktibo: erreproduzitu eta egin klik objektuan posizio bakoitza gordetzeko.",
    canvasCalibrationReady: "Markatu distantzia ezagun batez bereizitako bi puntu.",
    canvasScaleReady: "Eskala kalibratuta. Orain markatu jarraitu beharreko objektua.",
    canvasTrackingInProgress: "Jarraipena martxan...",
    canvasTrackingDone: "Jarraipena amaituta.",
    canvasInitialPointReady: "Hasierako puntua finkatuta. Orain jarraipena has dezakezu.",
    canvasTransformUpdated: "Eraldaketa eguneratuta. Egin klik objektuan edo kalibratu berriro behar baduzu.",
    canvasAtStart: "Hasierako unean zaude. Markatu hemen objektua jarraipen automatikoa erabili nahi baduzu.",
    canvasAtEnd: "Amaierako unean zaude. Egiaztatu hemen tartea nahi duzun lekuan amaitzen den.",
    canvasVideoReady: "Bideoa prest. Orain orientazioa doitu, kalibratu edo objektuan klik egin dezakezu.",
    canvasManualFinished: "Eskuzko modua amaituta. Berrikusi, esportatu edo tartea doitzen jarrai dezakezu.",
    canvasManualOff: "Eskuzko modua desaktibatuta. Orain jarraipen automatikoa erabil dezakezu nahi baduzu.",
    selectionNoPoint: "Oraindik ez dago punturik hautatuta.",
    selectionVideoLoaded: "Bideoa kargatuta. Orain puntua zuzenean markatu dezakezu.",
    selectionManualActive: "Eskuzko modua aktibo. Erreproduzitu eta klikekin objektuaren posizioa markatzen joan.",
    selectionManualPoints: "Eskuzko modua: {count} puntu gordeta.",
    selectionManualFinished: "Eskuzko modua {count} punturekin amaitu da.",
    selectionManualOffNoPoint: "Eskuzko modua desaktibatuta. Oraindik ez dago punturik hautatuta.",
    selectionCalibrationActive: "Kalibrazioa aktibo: markatu 2 erreferentzia-puntu {unit} unitatetan.",
    selectionCalibrationHalf: "Kalibrazioa aktibo: lehen puntua markatuta dago, bigarrena falta da.",
    selectionScaleReady: "Eskala kalibratuta. Orain markatu jarraitu beharreko objektua.",
    selectionTrackingInProgress: "Jarraipena martxan.",
    selectionTrackingDone: "Jarraipena {count} punturekin amaitu da.",
    selectionTransformApplied: "Eraldaketa aplikatuta. Orain puntua uneko irudian marka dezakezu.",
    selectionPointReady: "Objektuaren puntua ondo markatu da. Orain jarraipena has dezakezu.",
    toastPointMarked: "Puntua markatuta",
    toastManualPoint: "Eskuzko puntua",
    toastScaleCalibrated: "Eskala kalibratuta",
    toastCalibrationPoint: "Lehen kalibrazio-puntua",
    statusSelectVideoFirst: "Lehenengo hautatu bideo bat.",
    statusManualOn: "Eskuzko modua aktibatu da. Erreproduzitu bideoa eta egin klik objektuan ibilbidea marrazten joateko.",
    statusManualOff: "Eskuzko modua desaktibatuta.",
    statusManualFinished: "Eskuzko jarraipena {count} punturekin amaitu da.",
    statusManualPointSaved: "Eskuzko puntua gorde da t={time} unean.",
    statusCalibrateMoveVideo: "Lehenengo jarri bideoa kalibratu nahi duzun unean.",
    statusScaleDistancePositive: "Erreferentziako benetako distantziak 0 baino handiagoa izan behar du.",
    statusCalibrationOn: "Kalibrazioa aktibatuta. Markatu {distance} {unit} tartearekin bereizitako bi puntu.",
    statusMarkPointFirst: "Lehenengo markatu behar duzu jarraitu beharreko puntua.",
    statusProcessingSamples: "{start} eta {end} artean {count} lagin prozesatzen...",
    statusProcessingSample: "{count}tik {index}. lagina prozesatzen...",
    statusTrackingDone: "Jarraipena {count} punturekin amaitu da.",
    statusTrackingInterrupted: "Jarraipena eten da t={time} inguruan.",
    statusPlayingAtSpeed: "Bideoa {speed}x abiaduran erreproduzitzen.",
    statusPlaybackReachedEnd: "Erreprodukzioa tartearen amaierara arte osatu da.",
    statusPlaybackStopped: "Erreprodukzioa geldituta.",
    statusPlaybackCompleted: "Erreprodukzioa amaituta.",
    statusVideoLoaded: "Bideoa kargatuta. Mugitu nahi duzun unera eta egin klik objektuan markatzeko.",
    statusVideoReadyError: "Ezin izan da bideoa prestatu.",
    statusResetDone: "Berrezarpena eginda.",
    statusStartFixed: "Analisiaren hasiera {time} unean ezarri da.",
    statusEndFixed: "Analisiaren amaiera {time} unean ezarri da. Hasierara itzuli zara objektua markatzeko.",
    statusJumpedToStart: "Bideoa analisiaren hasieran jarrita ({time}).",
    statusJumpedToEnd: "Bideoa analisiaren amaieran jarrita ({time}).",
    statusScaleUpdated: "Eskala eguneratuta: {value} px {unit} bakoitzeko.",
    statusScaleInvalid: "Kalibrazioa ez da baliozkoa. Saiatu bi puntu desberdinekin.",
    statusCalibrationFirstPoint: "Lehen kalibrazio-puntua markatuta. Egin klik bigarren puntuan.",
    statusScaleCalibrated: "Eskala kalibratuta: {value} px {unit} bakoitzeko.",
    statusPointNearEdge: "Aukeratu puntua bideoaren ertzetik pixka bat urrunago.",
    statusPointReady: "Hasierako puntua finkatuta. Puntu hori koordenatuen jatorri gisa erabiliko da ({unit}).",
    statusOrientationUpdated: "Orientazioa edo biraketa eguneratuta.",
    statusReadFrameError: "Ezin izan da bideoa une horretan irakurri.",
    statusLoadVideoError: "Ezin izan da bideoa kargatu.",
    statusAnalysisRangeError: "Amaierako denborak hasierako denbora baino handiagoa izan behar du.",
    tableTime: "t (s)",
    tableX: "x ({unit})",
    tableY: "y ({unit})",
    chartTimeAxis: "Denbora (s)",
    chartXAxis: "x ({unit})",
    chartYAxis: "y ({unit}, gora)",
    chartVAxis: "v ({unit}/s)",
    csvFilename: "ibilbidea.csv",
    csvX: "x_{unit}",
    csvY: "y_{unit}_gora"
  },
  en: {
    pageTitle: "MotionTrackLab",
    languageLabel: "Language",
    languageAuto: "Auto",
    languageEs: "Español",
    languageCa: "Català",
    languageGl: "Galego",
    languageEu: "Euskara",
    languageEn: "English",
    themeDark: "Dark mode",
    themeLight: "Light mode",
    heroEyebrow: "Kinematics for secondary school",
    heroTitle: "MotionTrackLab",
    heroLead: "Load a video, mark the ball or object, and get horizontal and vertical position graphs as a function of time.",
    usageLink: "How to use it",
    controlsTitle: "1. Setup",
    videoLabel: "Video",
    videoFieldHelp: "Load the video you want to analyze. The object should stand out clearly from the background and the camera should stay still while recording.",
    sampleRateLabel: "Sampling rate",
    sampleRateFieldHelp: "Indicates how many frames per second are used to analyze the motion.",
    templateSizeLabel: "Reference size",
    templateSizeFieldHelp: "Defines the size of the crop around the object that the program will try to recognize.",
    searchRadiusLabel: "Search window",
    searchRadiusFieldHelp: "Sets how far the object will be searched for in the next frame.",
    startTimeLabel: "Analysis start",
    startTimeFieldHelp: "Sets the instant from which you want to start measuring.",
    endTimeLabel: "Analysis end",
    endTimeFieldHelp: "Sets the instant at which tracking will stop.",
    orientationLabel: "Video orientation",
    orientationFieldHelp: "Adjusts how the video is displayed if it was recorded rotated.",
    orientationOriginal: "Original",
    orientationHorizontal: "Automatic horizontal",
    orientationVerticalCw: "Vertical rotated to the right",
    orientationVerticalCcw: "Vertical rotated to the left",
    flipHorizontalLabel: "Horizontal flip so motion goes from left to right",
    flipHorizontalFieldHelp: "Flips the image horizontally so the motion appears toward the right.",
    flipVerticalLabel: "Vertical flip",
    flipVerticalFieldHelp: "Flips the image upside down if the video is inverted.",
    scaleDistanceLabel: "Real reference distance",
    scaleDistanceFieldHelp: "This is the real distance between the two points you will use to calibrate the scale.",
    scaleUnitTextLabel: "Spatial unit",
    scaleUnitTextFieldHelp: "Write the unit you want to use, for example m, cm or px if you do not calibrate.",
    helpTitle: "How to use it",
    helpStep1: "Load a video recorded on your phone or downloaded.",
    helpStep2: "Adjust the start and end instants, speed, and orientation if needed.",
    helpStep3: "Use <strong>horizontal flip</strong> if you want the motion to go from left to right.",
    helpStep4: "Move through the video with the bar and leave visible the instant you want to analyze.",
    helpStep5: "Optionally, click <strong>Calibrate scale</strong> and mark two points separated by a known distance.",
    helpStep6: "For automatic tracking, click on the mass or ball and then click <strong>Start tracking</strong>.",
    helpStep7: "If automatic tracking fails, enable <strong>Manual mode</strong>, play the clip, and keep clicking on the object to draw the path.",
    helpStep8: "Analyze the graphs, enable the option to show the theoretical fit if you want, and export the data. Coordinates are expressed relative to the first tracked point.",
    viewerTitle: "2. Selection and tracking",
    selectionStatusLabel: "Status:",
    playerPlayAria: "Play",
    playerPauseAria: "Pause",
    setStart: "Set start here",
    setEnd: "Set end here",
    jumpStart: "Go to start",
    jumpEnd: "Go to end",
    reset: "Reset",
    playbackRateLabel: "Speed",
    timelineStart: "Start: {time}",
    timelineEnd: "End: {time}",
    legendTarget: '<i class="dot dot--target"></i>Tracked point',
    legendPath: '<i class="dot dot--path"></i>Path',
    legendFit: '<i class="dot dot--fit"></i>Theoretical fit',
    manualMode: "Manual mode",
    manualModeExit: "Exit manual",
    manualModeHelp: "Lets you mark the object's position by hand at different instants if automatic tracking fails.",
    calibrateScale: "Calibrate scale",
    calibrateScaleHelp: "Tells the program how long a real distance is so it can convert pixels into units such as meters.",
    startTracking: "Start tracking",
    startTrackingHelp: "Makes the program automatically follow the object from the marked point and calculate its path.",
    statusSelectVideo: "Select a video to begin.",
    chartsTitle: "3. Graphs",
    chartXTitle: "Horizontal position x(t)",
    chartYTitle: "Vertical position y(t)",
    chartVTitle: "Instantaneous speed v(t)",
    chartXYTitle: "Path in the x-y plane",
    chartXHelp: "Shows how the horizontal position changes over time. If the line goes up, the object moves to the right.",
    chartYHelp: "Shows how the height changes over time. It helps you see whether the object rises, falls or reaches a highest point.",
    chartVHelp: "Shows how fast the object moves at each instant. The higher the value, the greater the speed.",
    chartXYHelp: "Draws the path seen from the side, using horizontal and vertical position together.",
    fitToggleLabel: "Show theoretical fit",
    fitToggleHint: "Overlays a parabolic model fitted to the measured trajectory.",
    fitUnavailableHint: "At least 3 tracked points are needed to compute the fit.",
    fitPanelTitle: "Theoretical fit",
    fitPanelLead: "Comparison with a drag-free model fitted to the measured data.",
    fitModelLabel: "Model",
    fitModelValue: "x(t) = x0 + vx0*t; y(t) = y0 + vy0*t - 0.5*g*t^2",
    fitVxLabel: "Horizontal initial velocity",
    fitVyLabel: "Vertical initial velocity",
    fitVxHelp: "It is the horizontal velocity that the model assumes at the start of the motion.",
    fitVyHelp: "It is the vertical velocity that the model assumes at the start of the motion.",
    fitGravityLabel: "Fitted g",
    fitRmseLabel: "RMS error",
    fitGravityHelp: "It is the vertical acceleration that best matches the video trajectory. If everything is well calibrated, it should be close to 9.8 m/s².",
    fitRmseHelp: "It measures how far, on average, the theoretical fit is from the real points. The smaller it is, the better the model matches.",
    infoTooltipLabel: "Explanation",
    fitMeasuredSeries: "Measured",
    fitAdjustedSeries: "Fit",
    summaryTitle: "Summary",
    summaryDuration: "Total time",
    summaryDx: "Horizontal displacement",
    summaryDy: "Vertical displacement",
    summaryDistance: "Distance traveled",
    summaryAverageSpeed: "Average speed",
    summaryMaxSpeed: "Maximum speed",
    summaryDurationHelp: "It is the duration of the analyzed segment, from the first point to the last one.",
    summaryDxHelp: "It tells how much the object moved horizontally between the start and the end.",
    summaryDyHelp: "It tells how much the height changed between the start and the end.",
    summaryDistanceHelp: "It is the total length of the path traveled, adding all the small displacements.",
    summaryAverageSpeedHelp: "It is the average speed for the whole motion: total distance divided by total time.",
    summaryMaxSpeedHelp: "It is the highest speed reached at any moment during the tracking.",
    resultsTitle: "Recorded data",
    exportCsv: "Export CSV",
    footerText: '© <a href="https://bilateria.org" target="_blank" rel="noreferrer">Juan José de Haro</a>. Licensed under <a href="https://www.gnu.org/licenses/agpl-3.0.html" target="_blank" rel="noreferrer">AGPLv3</a>. <a href="https://github.com/motiontracklab/motiontracklab.github.io/issues" target="_blank" rel="noreferrer">Suggestions and issues</a>.',
    canvasSelectVideo: "Load a video and click on the object.",
    canvasMoveAndMark: "Move to the desired instant and mark the object.",
    canvasMoveAndClick: "Move to the desired instant and click on the object.",
    canvasManualActive: "Manual mode active: play and click on the object to save each position.",
    canvasCalibrationReady: "Mark two points separated by a known distance.",
    canvasScaleReady: "Scale calibrated. Now mark the object to track.",
    canvasTrackingInProgress: "Tracking in progress...",
    canvasTrackingDone: "Tracking completed.",
    canvasInitialPointReady: "Initial point fixed. You can now start tracking.",
    canvasTransformUpdated: "Transform updated. Click on the object or calibrate again if needed.",
    canvasAtStart: "You are at the start instant. Mark the object here if you want automatic tracking.",
    canvasAtEnd: "You are at the final instant. Check here whether the segment ends where you want.",
    canvasVideoReady: "Video ready. You can now adjust orientation, calibrate, or click on the object.",
    canvasManualFinished: "Manual mode finished. You can review, export, or keep adjusting the segment.",
    canvasManualOff: "Manual mode disabled. You can now use automatic tracking if you want.",
    selectionNoPoint: "No point has been selected yet.",
    selectionVideoLoaded: "Video loaded. You can now mark the point directly.",
    selectionManualActive: "Manual mode active. Play and keep marking the object's position with clicks.",
    selectionManualPoints: "Manual mode: {count} saved points.",
    selectionManualFinished: "Manual mode finished with {count} points.",
    selectionManualOffNoPoint: "Manual mode disabled. No point has been selected yet.",
    selectionCalibrationActive: "Calibration active: mark 2 reference points in {unit}.",
    selectionCalibrationHalf: "Calibration active: first point marked, second one still missing.",
    selectionScaleReady: "Scale calibrated. You can now mark the object to track.",
    selectionTrackingInProgress: "Tracking in progress.",
    selectionTrackingDone: "Tracking completed with {count} points.",
    selectionTransformApplied: "Transform applied. You can now mark the point on the current image.",
    selectionPointReady: "Object point marked correctly. You can now start tracking.",
    toastPointMarked: "Point marked",
    toastManualPoint: "Manual point",
    toastScaleCalibrated: "Scale calibrated",
    toastCalibrationPoint: "First calibration point",
    statusSelectVideoFirst: "Select a video first.",
    statusManualOn: "Manual mode enabled. Play the video and click on the object to trace the path.",
    statusManualOff: "Manual mode disabled.",
    statusManualFinished: "Manual tracking finished with {count} points.",
    statusManualPointSaved: "Manual point saved at t={time}.",
    statusCalibrateMoveVideo: "First move the video to the instant you want to calibrate.",
    statusScaleDistancePositive: "The real reference distance must be greater than 0.",
    statusCalibrationOn: "Calibration enabled. Mark two points separated by {distance} {unit}.",
    statusMarkPointFirst: "You must first mark the point to track.",
    statusProcessingSamples: "Processing {count} samples between {start} and {end}...",
    statusProcessingSample: "Processing sample {index} of {count}...",
    statusTrackingDone: "Tracking completed with {count} points.",
    statusTrackingInterrupted: "Tracking interrupted near t={time}.",
    statusPlayingAtSpeed: "Playing video at {speed}x speed.",
    statusPlaybackReachedEnd: "Playback completed up to the end of the selected segment.",
    statusPlaybackStopped: "Playback stopped.",
    statusPlaybackCompleted: "Playback completed.",
    statusVideoLoaded: "Video loaded. Move to the instant you want and click on the object to mark it.",
    statusVideoReadyError: "The video could not be prepared.",
    statusResetDone: "Reset completed.",
    statusStartFixed: "Analysis start set to {time}.",
    statusEndFixed: "Analysis end set to {time}. You have returned to the start to mark the object.",
    statusJumpedToStart: "Video moved to the analysis start ({time}).",
    statusJumpedToEnd: "Video moved to the analysis end ({time}).",
    statusScaleUpdated: "Scale updated: {value} px per {unit}.",
    statusScaleInvalid: "Calibration is not valid. Try again with two different points.",
    statusCalibrationFirstPoint: "First calibration point marked. Click the second point.",
    statusScaleCalibrated: "Scale calibrated: {value} px per {unit}.",
    statusPointNearEdge: "Choose a point a bit farther from the video edge.",
    statusPointReady: "Initial point fixed. That point will be used as the coordinate origin ({unit}).",
    statusOrientationUpdated: "Orientation or flip updated.",
    statusReadFrameError: "The video could not be read at that instant.",
    statusLoadVideoError: "The video could not be loaded.",
    statusAnalysisRangeError: "The end time must be greater than the start time.",
    tableTime: "t (s)",
    tableX: "x ({unit})",
    tableY: "y ({unit})",
    chartTimeAxis: "Time (s)",
    chartXAxis: "x ({unit})",
    chartYAxis: "y ({unit}, upward)",
    chartVAxis: "v ({unit}/s)",
    csvFilename: "trajectory.csv",
    csvX: "x_{unit}",
    csvY: "y_{unit}_upward"
  }
};

let objectUrl = null;
let chartX = null;
let chartY = null;
let chartV = null;
let chartXY = null;
let previewAnimationFrame = null;
let selectionToastTimer = null;
let previewLastTimestamp = 0;
let previewTime = 0;
let previewSeekPending = false;
let trackerState = createInitialState();
let currentLanguage = "es";
let currentLanguagePreference = "auto";
let lastStatusMessage = { key: "statusSelectVideo", params: {}, isError: false };
let lastCanvasHintMessage = { key: "canvasSelectVideo", params: {} };
let lastSelectionMessage = { key: "selectionNoPoint", params: {} };
let lastToastMessage = null;

function formatTime(value) {
  return `${formatNumber(value, 2)} s`;
}

function normalizeLanguage(language) {
  if (!language) {
    return null;
  }

  const normalized = String(language).toLowerCase();
  const exactMatch = SUPPORTED_LANGUAGES.find((item) => item === normalized);
  if (exactMatch) {
    return exactMatch;
  }

  const base = normalized.split("-")[0];
  return SUPPORTED_LANGUAGES.find((item) => item === base) || null;
}

function detectBrowserLanguage() {
  const candidates = Array.isArray(navigator.languages) && navigator.languages.length
    ? navigator.languages
    : [navigator.language || navigator.userLanguage || "es"];

  for (const candidate of candidates) {
    const normalized = normalizeLanguage(candidate);
    if (normalized) {
      return normalized;
    }
  }

  return "es";
}

function getStoredLanguagePreference() {
  const stored = localStorage.getItem(LANGUAGE_STORAGE_KEY);
  if (stored === "auto") {
    return "auto";
  }
  return normalizeLanguage(stored) || "auto";
}

function resolveLanguage(preference) {
  return preference === "auto" ? detectBrowserLanguage() : (normalizeLanguage(preference) || "es");
}

function t(key, params = {}) {
  const template = translations[currentLanguage]?.[key] ?? translations.es[key] ?? key;
  return template.replace(/\{(\w+)\}/g, (_, name) => {
    const value = params[name];
    return value === undefined || value === null ? "" : String(value);
  });
}

function plainTextFromHtml(html) {
  return html.replace(/<[^>]+>/g, "").trim();
}

function setText(id, key, params = {}) {
  const element = document.getElementById(id);
  if (element) {
    element.textContent = t(key, params);
  }
}

function setHtml(id, key, params = {}) {
  const element = document.getElementById(id);
  if (element) {
    element.innerHTML = t(key, params);
  }
}

function renderLanguageOptions() {
  const labels = {
    auto: t("languageAuto"),
    es: t("languageEs"),
    ca: t("languageCa"),
    gl: t("languageGl"),
    eu: t("languageEu"),
    en: t("languageEn")
  };

  Array.from(languageSelect.options).forEach((option) => {
    option.textContent = labels[option.value] || option.value;
  });
  languageSelect.value = currentLanguagePreference;
}

function renderStatusMessage() {
  statusBox.textContent = lastStatusMessage.key
    ? t(lastStatusMessage.key, lastStatusMessage.params)
    : lastStatusMessage.raw;
  statusBox.classList.toggle("status--error", Boolean(lastStatusMessage.isError));
}

function renderCanvasHintMessage() {
  canvasHint.textContent = lastCanvasHintMessage.key
    ? t(lastCanvasHintMessage.key, lastCanvasHintMessage.params)
    : lastCanvasHintMessage.raw;
}

function renderSelectionMessage() {
  const message = lastSelectionMessage.key
    ? t(lastSelectionMessage.key, lastSelectionMessage.params)
    : lastSelectionMessage.raw;
  selectionStatus.innerHTML = `<strong>${t("selectionStatusLabel")}</strong> ${message}`;
}

function setStatusKey(key, params = {}, isError = false) {
  lastStatusMessage = { key, params, isError, raw: null };
  renderStatusMessage();
}

function setStatus(message, isError = false) {
  lastStatusMessage = { key: null, params: {}, isError, raw: message };
  renderStatusMessage();
}

function setCanvasHintKey(key, params = {}) {
  lastCanvasHintMessage = { key, params, raw: null };
  renderCanvasHintMessage();
}

function setCanvasHint(message) {
  lastCanvasHintMessage = { key: null, params: {}, raw: message };
  renderCanvasHintMessage();
}

function setSelectionStatusKey(key, params = {}) {
  lastSelectionMessage = { key, params, raw: null };
  renderSelectionMessage();
}

function updateSelectionStatus(message) {
  lastSelectionMessage = { key: null, params: {}, raw: message };
  renderSelectionMessage();
}

function showSelectionToastKey(key, params = {}) {
  if (selectionToastTimer) {
    clearTimeout(selectionToastTimer);
  }
  lastToastMessage = { key, params, raw: null };
  selectionToast.textContent = t(key, params);
  selectionToast.hidden = false;
  selectionToastTimer = setTimeout(() => {
    selectionToast.hidden = true;
  }, 1600);
}

function refreshToastLanguage() {
  if (!lastToastMessage || selectionToast.hidden) {
    return;
  }
  selectionToast.textContent = lastToastMessage.key
    ? t(lastToastMessage.key, lastToastMessage.params)
    : lastToastMessage.raw;
}

function renderStaticTexts() {
  document.documentElement.lang = currentLanguage;
  document.title = t("pageTitle");
  setText("languageLabel", "languageLabel");
  renderLanguageOptions();
  setText("heroEyebrow", "heroEyebrow");
  setText("heroTitle", "heroTitle");
  setText("heroLead", "heroLead");
  setText("usageLink", "usageLink");
  setText("controlsTitle", "controlsTitle");
  setHeadingWithInfo("videoLabel", "videoLabel", "videoFieldHelp");
  setHeadingWithInfo("sampleRateLabel", "sampleRateLabel", "sampleRateFieldHelp");
  setHeadingWithInfo("templateSizeLabel", "templateSizeLabel", "templateSizeFieldHelp");
  setHeadingWithInfo("searchRadiusLabel", "searchRadiusLabel", "searchRadiusFieldHelp");
  setHeadingWithInfo("startTimeLabel", "startTimeLabel", "startTimeFieldHelp");
  setHeadingWithInfo("endTimeLabel", "endTimeLabel", "endTimeFieldHelp");
  setHeadingWithInfo("orientationLabel", "orientationLabel", "orientationFieldHelp");
  setText("orientationOriginal", "orientationOriginal");
  setText("orientationHorizontal", "orientationHorizontal");
  setText("orientationVerticalCw", "orientationVerticalCw");
  setText("orientationVerticalCcw", "orientationVerticalCcw");
  setHeadingWithInfo("flipHorizontalLabel", "flipHorizontalLabel", "flipHorizontalFieldHelp");
  setHeadingWithInfo("flipVerticalLabel", "flipVerticalLabel", "flipVerticalFieldHelp");
  setHeadingWithInfo("scaleDistanceLabel", "scaleDistanceLabel", "scaleDistanceFieldHelp");
  setHeadingWithInfo("scaleUnitTextLabel", "scaleUnitTextLabel", "scaleUnitTextFieldHelp");
  setText("helpTitle", "helpTitle");
  setHtml("helpStep1", "helpStep1");
  setHtml("helpStep2", "helpStep2");
  setHtml("helpStep3", "helpStep3");
  setHtml("helpStep4", "helpStep4");
  setHtml("helpStep5", "helpStep5");
  setHtml("helpStep6", "helpStep6");
  setHtml("helpStep7", "helpStep7");
  setHtml("helpStep8", "helpStep8");
  setText("viewerTitle", "viewerTitle");
  setText("setStartBtn", "setStart");
  setText("setEndBtn", "setEnd");
  setText("jumpStartBtn", "jumpStart");
  setText("jumpEndBtn", "jumpEnd");
  setText("resetBtn", "reset");
  setText("playbackRateLabel", "playbackRateLabel");
  setHtml("legendTarget", "legendTarget");
  setHtml("legendPath", "legendPath");
  setHtml("legendFit", "legendFit");
  document.getElementById("manualModeHeading").innerHTML = buildHeadingWithInfo("manualMode", "manualModeHelp");
  document.getElementById("calibrateHeading").innerHTML = buildHeadingWithInfo("calibrateScale", "calibrateScaleHelp");
  document.getElementById("trackHeading").innerHTML = buildHeadingWithInfo("startTracking", "startTrackingHelp");
  setText("calibrateBtn", "calibrateScale");
  setText("trackBtn", "startTracking");
  setText("chartsTitle", "chartsTitle");
  setText("fitToggleLabel", "fitToggleLabel");
  setText("fitToggleHint", trackerState.theoreticalFit ? "fitToggleHint" : "fitUnavailableHint");
  setHtml("chartXTitle", "chartXTitle");
  document.getElementById("chartXTitle").innerHTML = buildHeadingWithInfo("chartXTitle", "chartXHelp");
  document.getElementById("chartYTitle").innerHTML = buildHeadingWithInfo("chartYTitle", "chartYHelp");
  document.getElementById("chartVTitle").innerHTML = buildHeadingWithInfo("chartVTitle", "chartVHelp");
  document.getElementById("chartXYTitle").innerHTML = buildHeadingWithInfo("chartXYTitle", "chartXYHelp");
  setText("summaryTitle", "summaryTitle");
  setText("fitPanelTitle", "fitPanelTitle");
  setText("fitPanelLead", "fitPanelLead");
  setText("resultsTitle", "resultsTitle");
  setText("exportBtn", "exportCsv");
  setHtml("footerText", "footerText");
}

function applyLanguage(preference, persist = true) {
  currentLanguagePreference = preference === "auto" ? "auto" : (normalizeLanguage(preference) || "auto");
  currentLanguage = resolveLanguage(currentLanguagePreference);
  renderStaticTexts();
  renderStatusMessage();
  renderCanvasHintMessage();
  renderSelectionMessage();
  refreshToastLanguage();
  updateThemeToggleLabel(document.documentElement.dataset.theme || "light");
  syncTimelineControls();
  rebuildResultsView();
  redrawCurrentState();
  if (persist) {
    localStorage.setItem(LANGUAGE_STORAGE_KEY, currentLanguagePreference);
  }
}

function getStoredTheme() {
  const stored = localStorage.getItem(THEME_STORAGE_KEY);
  return stored === "dark" || stored === "light" ? stored : null;
}

function getPreferredTheme() {
  return getStoredTheme() || (themeMediaQuery.matches ? "dark" : "light");
}

function getCssVar(name) {
  return getComputedStyle(document.documentElement).getPropertyValue(name).trim();
}

function updateThemeToggleLabel(theme) {
  const nextTheme = theme === "dark" ? "light" : "dark";
  themeToggleBtn.setAttribute("aria-pressed", String(theme === "dark"));
  themeToggleLabel.textContent = nextTheme === "dark" ? t("themeDark") : t("themeLight");
}

function refreshChartsForTheme() {
  if (!trackerState.samples.length && !trackerState.theoreticalFit) {
    return;
  }
  rebuildResultsView();
}

function applyTheme(theme, persist = true) {
  document.documentElement.dataset.theme = theme;
  updateThemeToggleLabel(theme);
  if (persist) {
    localStorage.setItem(THEME_STORAGE_KEY, theme);
  }
  refreshChartsForTheme();
  redrawCurrentState();
}

function createInitialState() {
  return {
    selectedPoint: null,
    originPoint: null,
    referencePatch: null,
    lastPatch: null,
    samples: [],
    manualMode: false,
    isTracking: false,
    isPreviewing: false,
    isCalibrating: false,
    readyForSelection: false,
    calibrationPoints: [],
    scale: {
      pixelsPerUnit: null,
      distance: 1,
      unit: "m"
    },
    theoreticalFit: null,
    showTheoreticalFit: false,
    sourceWidth: 0,
    sourceHeight: 0,
    videoWidth: 0,
    videoHeight: 0
  };
}

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function evenToOdd(value) {
  const parsed = Math.max(3, Number.parseInt(value, 10) || 3);
  return parsed % 2 === 0 ? parsed + 1 : parsed;
}

function formatNumber(value, decimals = 2) {
  return Number.isFinite(value) ? value.toFixed(decimals) : "";
}

function getDistance(pointA, pointB) {
  return Math.hypot(pointB.x - pointA.x, pointB.y - pointA.y);
}

function getSpatialUnit() {
  return scaleUnitInput.value.trim() || "m";
}

function getRotationDegrees() {
  const mode = orientationSelect.value;
  const width = trackerState.sourceWidth || video.videoWidth || 0;
  const height = trackerState.sourceHeight || video.videoHeight || 0;

  if (mode === "original") {
    return 0;
  }
  if (mode === "horizontal") {
    return height > width ? 90 : 0;
  }
  if (mode === "vertical-cw") {
    return width >= height ? 90 : 0;
  }
  if (mode === "vertical-ccw") {
    return width >= height ? 270 : 0;
  }
  return 0;
}

function getTransformConfig() {
  const rotation = getRotationDegrees();
  const swapAxes = rotation === 90 || rotation === 270;
  const width = swapAxes ? trackerState.sourceHeight : trackerState.sourceWidth;
  const height = swapAxes ? trackerState.sourceWidth : trackerState.sourceHeight;

  return {
    rotation,
    flipH: flipHorizontalInput.checked,
    flipV: flipVerticalInput.checked,
    width,
    height
  };
}

function updateCanvasSizeFromTransform() {
  const transform = getTransformConfig();
  trackerState.videoWidth = transform.width;
  trackerState.videoHeight = transform.height;
  canvas.width = transform.width || 960;
  canvas.height = transform.height || 540;
  offscreenCanvas.width = transform.width || 960;
  offscreenCanvas.height = transform.height || 540;
}

function applyTransform(context, transform) {
  context.translate(transform.width / 2, transform.height / 2);
  context.rotate((transform.rotation * Math.PI) / 180);
  context.scale(transform.flipH ? -1 : 1, transform.flipV ? -1 : 1);
}

function drawTransformedVideo(context) {
  const transform = getTransformConfig();
  if (!transform.width || !transform.height) {
    return;
  }

  context.save();
  context.clearRect(0, 0, transform.width, transform.height);
  applyTransform(context, transform);
  context.drawImage(
    video,
    -trackerState.sourceWidth / 2,
    -trackerState.sourceHeight / 2,
    trackerState.sourceWidth,
    trackerState.sourceHeight
  );
  context.restore();
}

function toPhysicalX(pixelX) {
  const originX = trackerState.originPoint?.x ?? 0;
  const relativePixels = pixelX - originX;
  if (!trackerState.scale.pixelsPerUnit) {
    return relativePixels;
  }
  return relativePixels / trackerState.scale.pixelsPerUnit;
}

function toPhysicalY(pixelY) {
  const originY = trackerState.originPoint?.y ?? trackerState.videoHeight;
  const upwardPixels = originY - pixelY;
  if (!trackerState.scale.pixelsPerUnit) {
    return upwardPixels;
  }
  return upwardPixels / trackerState.scale.pixelsPerUnit;
}

function fromPhysicalX(value) {
  const originX = trackerState.originPoint?.x ?? 0;
  if (!trackerState.scale.pixelsPerUnit) {
    return originX + value;
  }
  return originX + value * trackerState.scale.pixelsPerUnit;
}

function fromPhysicalY(value) {
  const originY = trackerState.originPoint?.y ?? trackerState.videoHeight;
  if (!trackerState.scale.pixelsPerUnit) {
    return originY - value;
  }
  return originY - value * trackerState.scale.pixelsPerUnit;
}

function solveLinearSystem(matrix, vector) {
  const size = vector.length;
  const augmented = matrix.map((row, index) => [...row, vector[index]]);

  for (let column = 0; column < size; column += 1) {
    let pivotRow = column;
    for (let row = column + 1; row < size; row += 1) {
      if (Math.abs(augmented[row][column]) > Math.abs(augmented[pivotRow][column])) {
        pivotRow = row;
      }
    }

    if (Math.abs(augmented[pivotRow][column]) < 1e-10) {
      return null;
    }

    if (pivotRow !== column) {
      [augmented[column], augmented[pivotRow]] = [augmented[pivotRow], augmented[column]];
    }

    const pivot = augmented[column][column];
    for (let cell = column; cell <= size; cell += 1) {
      augmented[column][cell] /= pivot;
    }

    for (let row = 0; row < size; row += 1) {
      if (row === column) {
        continue;
      }

      const factor = augmented[row][column];
      if (Math.abs(factor) < 1e-10) {
        continue;
      }

      for (let cell = column; cell <= size; cell += 1) {
        augmented[row][cell] -= factor * augmented[column][cell];
      }
    }
  }

  return augmented.map((row) => row[size]);
}

function fitPolynomial(xs, ys, degree) {
  const size = degree + 1;
  const powers = Array.from({ length: degree * 2 + 1 }, (_, power) => xs.reduce((sum, x) => sum + x ** power, 0));
  const matrix = Array.from({ length: size }, (_, row) => (
    Array.from({ length: size }, (_, column) => powers[row + column])
  ));
  const vector = Array.from({ length: size }, (_, row) => (
    xs.reduce((sum, x, index) => sum + ys[index] * (x ** row), 0)
  ));

  return solveLinearSystem(matrix, vector);
}

function evaluatePolynomial(coefficients, value) {
  return coefficients.reduce((sum, coefficient, power) => sum + coefficient * (value ** power), 0);
}

function computeTheoreticalFit() {
  if (trackerState.samples.length < 3) {
    return null;
  }

  const firstTime = trackerState.samples[0].t;
  const points = trackerState.samples.map((sample) => ({
    tRelative: sample.t - firstTime,
    tAbsolute: sample.t,
    x: toPhysicalX(sample.x),
    y: toPhysicalY(sample.y)
  }));
  const distinctTimes = new Set(points.map((point) => point.tRelative.toFixed(6)));
  const duration = points[points.length - 1].tRelative;

  if (distinctTimes.size < 3 || duration <= 0) {
    return null;
  }

  const xCoefficients = fitPolynomial(
    points.map((point) => point.tRelative),
    points.map((point) => point.x),
    1
  );
  const yCoefficients = fitPolynomial(
    points.map((point) => point.tRelative),
    points.map((point) => point.y),
    2
  );

  if (!xCoefficients || !yCoefficients) {
    return null;
  }

  const predictions = points.map((point) => ({
    tRelative: point.tRelative,
    tAbsolute: point.tAbsolute,
    x: evaluatePolynomial(xCoefficients, point.tRelative),
    y: evaluatePolynomial(yCoefficients, point.tRelative)
  }));
  const denseSamples = Math.max(48, Math.min(220, points.length * 6));
  const densePredictions = Array.from({ length: denseSamples }, (_, index) => {
    const tRelative = denseSamples === 1 ? 0 : (duration * index) / (denseSamples - 1);
    return {
      tRelative,
      tAbsolute: firstTime + tRelative,
      x: evaluatePolynomial(xCoefficients, tRelative),
      y: evaluatePolynomial(yCoefficients, tRelative)
    };
  });

  const velocityPredictions = points.slice(1).map((point) => {
    const vy = yCoefficients[1] + 2 * yCoefficients[2] * point.tRelative;
    return {
      t: Number(point.tAbsolute.toFixed(3)),
      v: Math.hypot(xCoefficients[1], vy)
    };
  });

  const errors = predictions.map((prediction, index) => {
    const point = points[index];
    const dx = point.x - prediction.x;
    const dy = point.y - prediction.y;
    return { dx, dy };
  });
  const rmseX = Math.sqrt(errors.reduce((sum, error) => sum + error.dx ** 2, 0) / errors.length);
  const rmseY = Math.sqrt(errors.reduce((sum, error) => sum + error.dy ** 2, 0) / errors.length);
  const rmseTotal = Math.sqrt(errors.reduce((sum, error) => sum + error.dx ** 2 + error.dy ** 2, 0) / errors.length);

  return {
    xCoefficients,
    yCoefficients,
    predictions,
    densePredictions,
    velocityPredictions,
    vx0: xCoefficients[1],
    vy0: yCoefficients[1],
    g: -2 * yCoefficients[2],
    rmseX,
    rmseY,
    rmseTotal
  };
}

function disposeVideoUrl() {
  if (objectUrl) {
    URL.revokeObjectURL(objectUrl);
    objectUrl = null;
  }
}

function resetChartsAndTable() {
  if (chartX) {
    chartX.destroy();
    chartX = null;
  }
  if (chartY) {
    chartY.destroy();
    chartY = null;
  }
  if (chartV) {
    chartV.destroy();
    chartV = null;
  }
  if (chartXY) {
    chartXY.destroy();
    chartXY = null;
  }
  tableBody.innerHTML = "";
  fitSummaryGrid.innerHTML = "";
  fitPanel.hidden = true;
}

function getVelocityPoints() {
  return trackerState.samples.slice(1).map((sample, index) => {
    const previous = trackerState.samples[index];
    const dt = sample.t - previous.t;
    const dx = toPhysicalX(sample.x) - toPhysicalX(previous.x);
    const dy = toPhysicalY(sample.y) - toPhysicalY(previous.y);
    const speed = dt > 0 ? Math.hypot(dx, dy) / dt : 0;

    return {
      t: Number(sample.t.toFixed(3)),
      v: speed
    };
  });
}

function syncFitControls() {
  const available = Boolean(trackerState.theoreticalFit);
  fitToggleInput.disabled = !available;
  fitToggleInput.checked = available && trackerState.showTheoreticalFit;
  fitToggleHint.textContent = available ? t("fitToggleHint") : t("fitUnavailableHint");
  legendFit.hidden = !(available && trackerState.showTheoreticalFit);
}

function buildInfoLabel(titleKey, helpKey) {
  return `
    <span class="summary-card__label-row">
      <span>${t(titleKey)}</span>
      <button
        type="button"
        class="info-button"
        data-tooltip-key="${helpKey}"
        aria-label="${t("infoTooltipLabel")}"
        aria-expanded="false"
      >?</button>
      <span class="info-tooltip" hidden>${t(helpKey)}</span>
    </span>
  `;
}

function closeInfoTooltips(root = document) {
  root.querySelectorAll(".info-button[aria-expanded='true']").forEach((button) => {
    button.setAttribute("aria-expanded", "false");
  });
  root.querySelectorAll(".info-tooltip").forEach((tooltip) => {
    tooltip.hidden = true;
  });
}

function buildHeadingWithInfo(titleKey, helpKey) {
  return `
    <span class="title-with-info">
      <span>${t(titleKey)}</span>
      <button
        type="button"
        class="info-button"
        data-tooltip-key="${helpKey}"
        aria-label="${t("infoTooltipLabel")}"
        aria-expanded="false"
      >?</button>
      <span class="info-tooltip" hidden>${t(helpKey)}</span>
    </span>
  `;
}

function setHeadingWithInfo(id, titleKey, helpKey) {
  const element = document.getElementById(id);
  if (element) {
    element.innerHTML = buildHeadingWithInfo(titleKey, helpKey);
  }
}

function renderFitPanel() {
  const fit = trackerState.showTheoreticalFit ? trackerState.theoreticalFit : null;
  fitPanel.hidden = !fit;
  fitSummaryGrid.innerHTML = "";

  if (!fit) {
    return;
  }

  const unit = trackerState.scale.pixelsPerUnit ? trackerState.scale.unit : "px";

  fitSummaryGrid.innerHTML = `
    <div class="summary-card">
      <span class="summary-card__label">${t("fitModelLabel")}</span>
      <strong class="summary-card__value summary-card__value--formula">${t("fitModelValue")}</strong>
    </div>
    <div class="summary-card">
      ${buildInfoLabel("fitVxLabel", "fitVxHelp")}
      <strong class="summary-card__value">${formatNumber(fit.vx0, 3)} ${unit}/s</strong>
    </div>
    <div class="summary-card">
      ${buildInfoLabel("fitVyLabel", "fitVyHelp")}
      <strong class="summary-card__value">${formatNumber(fit.vy0, 3)} ${unit}/s</strong>
    </div>
    <div class="summary-card">
      ${buildInfoLabel("fitGravityLabel", "fitGravityHelp")}
      <strong class="summary-card__value">${formatNumber(fit.g, 3)} ${unit}/s²</strong>
    </div>
    <div class="summary-card">
      ${buildInfoLabel("fitRmseLabel", "fitRmseHelp")}
      <strong class="summary-card__value">${formatNumber(fit.rmseTotal, 3)} ${unit}</strong>
    </div>
  `;
}

function renderSummary() {
  const unit = trackerState.scale.pixelsPerUnit ? trackerState.scale.unit : "px";
  const emptyCards = `
    <div class="summary-card"><span class="summary-card__label-row"><span>${t("summaryDuration")}</span><button type="button" class="info-button" data-tooltip-key="summaryDurationHelp" aria-label="${t("infoTooltipLabel")}" aria-expanded="false">?</button><span class="info-tooltip" hidden>${t("summaryDurationHelp")}</span></span><strong class="summary-card__value">-</strong></div>
    <div class="summary-card"><span class="summary-card__label-row"><span>${t("summaryDx")}</span><button type="button" class="info-button" data-tooltip-key="summaryDxHelp" aria-label="${t("infoTooltipLabel")}" aria-expanded="false">?</button><span class="info-tooltip" hidden>${t("summaryDxHelp")}</span></span><strong class="summary-card__value">-</strong></div>
    <div class="summary-card"><span class="summary-card__label-row"><span>${t("summaryDy")}</span><button type="button" class="info-button" data-tooltip-key="summaryDyHelp" aria-label="${t("infoTooltipLabel")}" aria-expanded="false">?</button><span class="info-tooltip" hidden>${t("summaryDyHelp")}</span></span><strong class="summary-card__value">-</strong></div>
    <div class="summary-card"><span class="summary-card__label-row"><span>${t("summaryDistance")}</span><button type="button" class="info-button" data-tooltip-key="summaryDistanceHelp" aria-label="${t("infoTooltipLabel")}" aria-expanded="false">?</button><span class="info-tooltip" hidden>${t("summaryDistanceHelp")}</span></span><strong class="summary-card__value">-</strong></div>
    <div class="summary-card"><span class="summary-card__label-row"><span>${t("summaryAverageSpeed")}</span><button type="button" class="info-button" data-tooltip-key="summaryAverageSpeedHelp" aria-label="${t("infoTooltipLabel")}" aria-expanded="false">?</button><span class="info-tooltip" hidden>${t("summaryAverageSpeedHelp")}</span></span><strong class="summary-card__value">-</strong></div>
    <div class="summary-card"><span class="summary-card__label-row"><span>${t("summaryMaxSpeed")}</span><button type="button" class="info-button" data-tooltip-key="summaryMaxSpeedHelp" aria-label="${t("infoTooltipLabel")}" aria-expanded="false">?</button><span class="info-tooltip" hidden>${t("summaryMaxSpeedHelp")}</span></span><strong class="summary-card__value">-</strong></div>
  `;

  if (!trackerState.samples.length) {
    summaryGrid.innerHTML = emptyCards;
    return;
  }

  const first = trackerState.samples[0];
  const last = trackerState.samples[trackerState.samples.length - 1];
  const duration = Math.max(last.t - first.t, 0);
  const dx = toPhysicalX(last.x) - toPhysicalX(first.x);
  const dy = toPhysicalY(last.y) - toPhysicalY(first.y);
  let distance = 0;

  for (let i = 1; i < trackerState.samples.length; i += 1) {
    const previous = trackerState.samples[i - 1];
    const current = trackerState.samples[i];
    const segmentDx = toPhysicalX(current.x) - toPhysicalX(previous.x);
    const segmentDy = toPhysicalY(current.y) - toPhysicalY(previous.y);
    distance += Math.hypot(segmentDx, segmentDy);
  }

  const velocities = getVelocityPoints();
  const averageSpeed = duration > 0 ? distance / duration : 0;
  const maxSpeed = velocities.length ? Math.max(...velocities.map((point) => point.v)) : 0;

  summaryGrid.innerHTML = `
    <div class="summary-card">
      ${buildInfoLabel("summaryDuration", "summaryDurationHelp")}
      <strong class="summary-card__value">${formatNumber(duration, 3)} s</strong>
    </div>
    <div class="summary-card">
      ${buildInfoLabel("summaryDx", "summaryDxHelp")}
      <strong class="summary-card__value">${formatNumber(dx, 3)} ${unit}</strong>
    </div>
    <div class="summary-card">
      ${buildInfoLabel("summaryDy", "summaryDyHelp")}
      <strong class="summary-card__value">${formatNumber(dy, 3)} ${unit}</strong>
    </div>
    <div class="summary-card">
      ${buildInfoLabel("summaryDistance", "summaryDistanceHelp")}
      <strong class="summary-card__value">${formatNumber(distance, 3)} ${unit}</strong>
    </div>
    <div class="summary-card">
      ${buildInfoLabel("summaryAverageSpeed", "summaryAverageSpeedHelp")}
      <strong class="summary-card__value">${formatNumber(averageSpeed, 3)} ${unit}/s</strong>
    </div>
    <div class="summary-card">
      ${buildInfoLabel("summaryMaxSpeed", "summaryMaxSpeedHelp")}
      <strong class="summary-card__value">${formatNumber(maxSpeed, 3)} ${unit}/s</strong>
    </div>
  `;
}

function rebuildResultsView() {
  resetChartsAndTable();
  trackerState.theoreticalFit = computeTheoreticalFit();
  tableHeadRow.innerHTML = `<th>${t("tableTime")}</th><th>x</th><th>y</th>`;
  syncFitControls();
  renderSummary();
  renderFitPanel();

  if (!trackerState.samples.length) {
    exportBtn.disabled = true;
    return;
  }

  populateTable();
  buildCharts();
  exportBtn.disabled = false;
}

function clearCanvasMessage(message) {
  const text = translations.es[message] ? t(message) : message;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = getCssVar("--canvas-empty-bg");
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = getCssVar("--canvas-empty-ink");
  ctx.font = "24px sans-serif";
  ctx.textAlign = "center";
  ctx.fillText(text, canvas.width / 2, canvas.height / 2);
}

function resetState(keepVideo = true) {
  trackerState = createInitialState();
  trackBtn.disabled = true;
  manualModeBtn.disabled = !keepVideo;
  manualModeBtn.classList.remove("button--active");
  manualModeBtn.textContent = t("manualMode");
  calibrateBtn.disabled = !keepVideo;
  setStartBtn.disabled = !keepVideo;
  setEndBtn.disabled = !keepVideo;
  exportBtn.disabled = true;
  setCanvasHintKey(keepVideo ? "canvasMoveAndClick" : "canvasSelectVideo");
  selectionToast.hidden = true;
  lastToastMessage = null;
  setSelectionStatusKey("selectionNoPoint");
  rebuildResultsView();
  syncTimelineControls();
  clearCanvasMessage(keepVideo ? "canvasMoveAndMark" : "statusSelectVideo");
}

function drawFrame(point = trackerState.selectedPoint) {
  if (!trackerState.videoWidth || !trackerState.videoHeight) {
    clearCanvasMessage("statusSelectVideo");
    return;
  }

  drawTransformedVideo(ctx);

  if (trackerState.showTheoreticalFit && trackerState.theoreticalFit?.densePredictions.length) {
    ctx.save();
    ctx.strokeStyle = FIT_COLOR;
    ctx.lineWidth = 2.5;
    ctx.setLineDash([10, 7]);
    ctx.beginPath();
    trackerState.theoreticalFit.densePredictions.forEach((sample, index) => {
      const x = fromPhysicalX(sample.x);
      const y = fromPhysicalY(sample.y);
      if (index === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    });
    ctx.stroke();
    ctx.restore();
  }

  if (trackerState.samples.length > 1) {
    ctx.save();
    ctx.strokeStyle = "#d1793f";
    ctx.lineWidth = 3;
    ctx.beginPath();
    trackerState.samples.forEach((sample, index) => {
      if (index === 0) {
        ctx.moveTo(sample.x, sample.y);
      } else {
        ctx.lineTo(sample.x, sample.y);
      }
    });
    ctx.stroke();
    const lastSample = trackerState.samples[trackerState.samples.length - 1];
    ctx.fillStyle = "#d1793f";
    ctx.font = "bold 18px sans-serif";
    ctx.fillText(plainTextFromHtml(t("legendPath")), lastSample.x + 12, lastSample.y - 12);
    ctx.restore();
  }

  if (trackerState.calibrationPoints.length) {
    ctx.save();
    ctx.strokeStyle = "#18676b";
    ctx.fillStyle = "#18676b";
    ctx.lineWidth = 3;
    trackerState.calibrationPoints.forEach((calPoint) => {
      ctx.beginPath();
      ctx.arc(calPoint.x, calPoint.y, 6, 0, Math.PI * 2);
      ctx.fill();
    });
    if (trackerState.calibrationPoints.length === 2) {
      const [pointA, pointB] = trackerState.calibrationPoints;
      ctx.beginPath();
      ctx.moveTo(pointA.x, pointA.y);
      ctx.lineTo(pointB.x, pointB.y);
      ctx.stroke();
      ctx.font = "bold 18px sans-serif";
      ctx.fillText(
        `${formatNumber(trackerState.scale.distance, 3)} ${trackerState.scale.unit}`,
        (pointA.x + pointB.x) / 2 + 10,
        (pointA.y + pointB.y) / 2 - 10
      );
    }
    ctx.restore();
  }

  if (point) {
    ctx.save();
    ctx.fillStyle = "rgba(214, 50, 50, 0.28)";
    ctx.strokeStyle = "#d63232";
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.arc(point.x, point.y, 15, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(point.x, point.y, 8, 0, Math.PI * 2);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(point.x - 14, point.y);
    ctx.lineTo(point.x + 14, point.y);
    ctx.moveTo(point.x, point.y - 14);
    ctx.lineTo(point.x, point.y + 14);
    ctx.stroke();
    ctx.restore();
  }
}

function getCanvasPoint(event) {
  const rect = canvas.getBoundingClientRect();
  const scaleX = canvas.width / rect.width;
  const scaleY = canvas.height / rect.height;
  return {
    x: (event.clientX - rect.left) * scaleX,
    y: (event.clientY - rect.top) * scaleY
  };
}

function getCurrentPlaybackTime() {
  return trackerState.isPreviewing ? previewTime : (video.currentTime || 0);
}

function getGrayFrame() {
  drawTransformedVideo(offscreenCtx);
  const imageData = offscreenCtx.getImageData(0, 0, offscreenCanvas.width, offscreenCanvas.height);
  const gray = new Float32Array(imageData.width * imageData.height);
  const { data } = imageData;

  for (let i = 0, px = 0; i < data.length; i += 4, px += 1) {
    gray[px] = data[i] * 0.299 + data[i + 1] * 0.587 + data[i + 2] * 0.114;
  }

  return {
    width: imageData.width,
    height: imageData.height,
    gray
  };
}

function extractPatch(frame, centerX, centerY, size) {
  const half = Math.floor(size / 2);
  const roundedX = Math.round(centerX);
  const roundedY = Math.round(centerY);

  if (
    roundedX - half < 0 ||
    roundedY - half < 0 ||
    roundedX + half >= frame.width ||
    roundedY + half >= frame.height
  ) {
    return null;
  }

  const patch = new Float32Array(size * size);
  let index = 0;

  for (let y = -half; y <= half; y += 1) {
    for (let x = -half; x <= half; x += 1) {
      const frameIndex = (roundedY + y) * frame.width + (roundedX + x);
      patch[index] = frame.gray[frameIndex];
      index += 1;
    }
  }

  return patch;
}

function buildPatchWeights(size) {
  const half = Math.floor(size / 2);
  const sigma = Math.max(size / 5, 1);
  const weights = new Float32Array(size * size);
  let index = 0;

  for (let y = -half; y <= half; y += 1) {
    for (let x = -half; x <= half; x += 1) {
      const radiusSquared = x * x + y * y;
      weights[index] = 1 + 4 * Math.exp(-radiusSquared / (2 * sigma * sigma));
      index += 1;
    }
  }

  return weights;
}

function blendPatches(previousPatch, candidatePatch, alpha = 0.72) {
  const blended = new Float32Array(candidatePatch.length);

  for (let i = 0; i < candidatePatch.length; i += 1) {
    const previousValue = previousPatch ? previousPatch[i] : candidatePatch[i];
    blended[i] = alpha * candidatePatch[i] + (1 - alpha) * previousValue;
  }

  return blended;
}

function comparePatches(candidate, reference, previous, weights) {
  let score = 0;

  for (let i = 0; i < candidate.length; i += 1) {
    const weight = weights ? weights[i] : 1;
    score += 0.18 * weight * Math.abs(candidate[i] - reference[i]);
    if (previous) {
      score += 0.82 * weight * Math.abs(candidate[i] - previous[i]);
    }
  }

  return score;
}

function findBestMatch(frame, predictedPoint, referencePatch, previousPatch, patchSize, searchRadius, weights) {
  let bestPoint = null;
  let bestPatch = null;
  let bestScore = Number.POSITIVE_INFINITY;

  const centerX = Math.round(predictedPoint.x);
  const centerY = Math.round(predictedPoint.y);

  for (let offsetY = -searchRadius; offsetY <= searchRadius; offsetY += 1) {
    for (let offsetX = -searchRadius; offsetX <= searchRadius; offsetX += 1) {
      const candidateX = centerX + offsetX;
      const candidateY = centerY + offsetY;
      const candidatePatch = extractPatch(frame, candidateX, candidateY, patchSize);

      if (!candidatePatch) {
        continue;
      }

      const motionPenalty = 0.08 * (offsetX * offsetX + offsetY * offsetY);
      const score = comparePatches(candidatePatch, referencePatch, previousPatch, weights) + motionPenalty;
      if (score < bestScore) {
        bestScore = score;
        bestPoint = { x: candidateX, y: candidateY };
        bestPatch = candidatePatch;
      }
    }
  }

  return { point: bestPoint, patch: bestPatch };
}

function seekVideo(time) {
  return new Promise((resolve, reject) => {
    const targetTime = clamp(time, 0, Math.max((video.duration || 0) - 0.001, 0));
    const onSeeked = () => {
      cleanup();
      resolve();
    };
    const onError = () => {
      cleanup();
      reject(new Error(t("statusReadFrameError")));
    };
    const cleanup = () => {
      video.removeEventListener("seeked", onSeeked);
      video.removeEventListener("error", onError);
    };

    video.addEventListener("seeked", onSeeked, { once: true });
    video.addEventListener("error", onError, { once: true });

    if (Math.abs(video.currentTime - targetTime) < 0.0005) {
      cleanup();
      resolve();
      return;
    }

    video.currentTime = targetTime;
  });
}

function waitForVideoReady() {
  return new Promise((resolve, reject) => {
    if (video.readyState >= 2 && video.videoWidth > 0 && video.videoHeight > 0) {
      resolve();
      return;
    }

    const onLoadedData = () => {
      cleanup();
      resolve();
    };
    const onError = () => {
      cleanup();
      reject(new Error(t("statusLoadVideoError")));
    };
    const cleanup = () => {
      video.removeEventListener("loadeddata", onLoadedData);
      video.removeEventListener("error", onError);
    };

    video.addEventListener("loadeddata", onLoadedData, { once: true });
    video.addEventListener("error", onError, { once: true });
    video.load();
  });
}

function syncTimelineControls() {
  const duration = Number.isFinite(video.duration) ? video.duration : 0;
  const currentTime = clamp(video.currentTime || 0, 0, duration);
  const startTime = clamp(Number.parseFloat(startTimeInput.value) || 0, 0, duration);
  const endTime = clamp(Number.parseFloat(endTimeInput.value) || 0, 0, duration);
  const hasVideo = duration > 0;
  timelineRange.max = String(duration || 0);
  timelineRange.value = String(currentTime);
  timelineRange.disabled = !hasVideo || trackerState.isTracking;
  timelineRange.parentElement.style.setProperty("--start-percent", `${duration ? (startTime / duration) * 100 : 0}%`);
  timelineRange.parentElement.style.setProperty("--end-percent", `${duration ? (endTime / duration) * 100 : 100}%`);
  playPauseBtn.disabled = !hasVideo || trackerState.isTracking;
  playPauseBtn.textContent = trackerState.isPreviewing ? "❚❚" : "▶";
  playPauseBtn.classList.toggle("player-bar__toggle--play", !trackerState.isPreviewing);
  playPauseBtn.classList.toggle("player-bar__toggle--pause", trackerState.isPreviewing);
  playPauseBtn.setAttribute("aria-label", trackerState.isPreviewing ? t("playerPauseAria") : t("playerPlayAria"));
  setStartBtn.disabled = !hasVideo || trackerState.isTracking || trackerState.isPreviewing;
  setEndBtn.disabled = !hasVideo || trackerState.isTracking || trackerState.isPreviewing;
  jumpStartBtn.disabled = !hasVideo || trackerState.isTracking || trackerState.isPreviewing;
  jumpEndBtn.disabled = !hasVideo || trackerState.isTracking || trackerState.isPreviewing;
  manualModeBtn.disabled = !hasVideo || trackerState.isTracking;
  manualModeBtn.classList.toggle("button--active", trackerState.manualMode);
  manualModeBtn.textContent = trackerState.manualMode ? t("manualModeExit") : t("manualMode");
  timelineCurrentLabel.textContent = formatTime(currentTime);
  timelineStartLabel.textContent = t("timelineStart", { time: formatTime(startTime) });
  timelineEndLabel.textContent = t("timelineEnd", { time: formatTime(endTime) });
}

async function seekAndRender(time) {
  await seekVideo(time);
  drawFrame();
  syncTimelineControls();
}

function buildChartOptions(xLabel, yLabel, showLegend = false) {
  const ink = getCssVar("--ink");
  const muted = getCssVar("--muted");
  const line = getCssVar("--line");

  return {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        display: showLegend,
        labels: {
          color: ink,
          usePointStyle: true,
          boxWidth: 12
        }
      }
    },
    scales: {
      x: {
        ticks: {
          color: muted
        },
        grid: {
          color: line
        },
        title: {
          display: true,
          text: xLabel,
          color: ink
        }
      },
      y: {
        ticks: {
          color: muted
        },
        grid: {
          color: line
        },
        title: {
          display: true,
          text: yLabel,
          color: ink
        }
      }
    }
  };
}

function buildPlaneChartOptions(xLabel, yLabel, showLegend = false) {
  const ink = getCssVar("--ink");
  const muted = getCssVar("--muted");
  const line = getCssVar("--line");

  return {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        display: showLegend,
        labels: {
          color: ink,
          usePointStyle: true,
          boxWidth: 12
        }
      }
    },
    scales: {
      x: {
        type: "linear",
        ticks: {
          color: muted
        },
        grid: {
          color: line
        },
        title: {
          display: true,
          text: xLabel,
          color: ink
        }
      },
      y: {
        type: "linear",
        ticks: {
          color: muted
        },
        grid: {
          color: line
        },
        title: {
          display: true,
          text: yLabel,
          color: ink
        }
      }
    }
  };
}

function buildCharts() {
  const labels = trackerState.samples.map((sample) => Number(sample.t.toFixed(3)));
  const xData = trackerState.samples.map((sample) => toPhysicalX(sample.x));
  const yData = trackerState.samples.map((sample) => toPhysicalY(sample.y));
  const unit = trackerState.scale.pixelsPerUnit ? trackerState.scale.unit : "px";
  const velocityPoints = getVelocityPoints();
  const fit = trackerState.showTheoreticalFit ? trackerState.theoreticalFit : null;
  const xyData = trackerState.samples.map((sample) => ({
    x: toPhysicalX(sample.x),
    y: toPhysicalY(sample.y)
  }));
  const showLegend = Boolean(fit);
  const xDatasets = [{
    label: t("fitMeasuredSeries"),
    data: xData,
    borderColor: getCssVar("--accent"),
    backgroundColor: "rgba(24, 103, 107, 0.18)",
    tension: 0.2,
    pointRadius: 2
  }];
  const yDatasets = [{
    label: t("fitMeasuredSeries"),
    data: yData,
    borderColor: getCssVar("--warm"),
    backgroundColor: "rgba(209, 121, 63, 0.18)",
    tension: 0.2,
    pointRadius: 2
  }];
  const vDatasets = [{
    label: t("fitMeasuredSeries"),
    data: velocityPoints.map((point) => point.v),
    borderColor: "#e54f6d",
    backgroundColor: "rgba(229, 79, 109, 0.18)",
    tension: 0.2,
    pointRadius: 2
  }];
  const xyDatasets = [{
    label: t("fitMeasuredSeries"),
    data: xyData,
    showLine: true,
    borderColor: getCssVar("--accent-strong"),
    backgroundColor: "rgba(109, 201, 200, 0.22)",
    pointBackgroundColor: getCssVar("--warm"),
    pointBorderColor: getCssVar("--warm"),
    pointRadius: 2,
    tension: 0.18
  }];

  if (fit) {
    xDatasets.push({
      label: t("fitAdjustedSeries"),
      data: fit.predictions.map((sample) => sample.x),
      borderColor: FIT_COLOR,
      backgroundColor: "rgba(58, 120, 179, 0.12)",
      borderDash: [10, 6],
      tension: 0,
      pointRadius: 0
    });
    yDatasets.push({
      label: t("fitAdjustedSeries"),
      data: fit.predictions.map((sample) => sample.y),
      borderColor: FIT_COLOR,
      backgroundColor: "rgba(58, 120, 179, 0.12)",
      borderDash: [10, 6],
      tension: 0,
      pointRadius: 0
    });
    vDatasets.push({
      label: t("fitAdjustedSeries"),
      data: fit.velocityPredictions.map((point) => point.v),
      borderColor: FIT_COLOR,
      backgroundColor: "rgba(58, 120, 179, 0.12)",
      borderDash: [10, 6],
      tension: 0,
      pointRadius: 0
    });
    xyDatasets.push({
      label: t("fitAdjustedSeries"),
      data: fit.densePredictions.map((sample) => ({ x: sample.x, y: sample.y })),
      showLine: true,
      borderColor: FIT_COLOR,
      backgroundColor: "rgba(58, 120, 179, 0.12)",
      borderDash: [10, 6],
      pointRadius: 0,
      tension: 0
    });
  }

  chartX = new Chart(document.getElementById("chartX"), {
    type: "line",
    data: {
      labels,
      datasets: xDatasets
    },
    options: buildChartOptions(t("chartTimeAxis"), t("chartXAxis", { unit }), showLegend)
  });

  chartY = new Chart(document.getElementById("chartY"), {
    type: "line",
    data: {
      labels,
      datasets: yDatasets
    },
    options: buildChartOptions(t("chartTimeAxis"), t("chartYAxis", { unit }), showLegend)
  });

  chartV = new Chart(document.getElementById("chartV"), {
    type: "line",
    data: {
      labels: velocityPoints.map((point) => point.t),
      datasets: vDatasets
    },
    options: buildChartOptions(t("chartTimeAxis"), t("chartVAxis", { unit }), showLegend)
  });

  chartXY = new Chart(document.getElementById("chartXY"), {
    type: "scatter",
    data: {
      datasets: xyDatasets
    },
    options: buildPlaneChartOptions(
      t("chartXAxis", { unit }),
      t("chartYAxis", { unit }),
      showLegend
    )
  });
}

function populateTable() {
  const unit = trackerState.scale.pixelsPerUnit ? trackerState.scale.unit : "px";
  tableHeadRow.innerHTML = `
    <th>${t("tableTime")}</th>
    <th>${t("tableX", { unit })}</th>
    <th>${t("tableY", { unit })}</th>
  `;
  tableBody.innerHTML = trackerState.samples.map((sample) => `
    <tr>
      <td>${formatNumber(sample.t, 3)}</td>
      <td>${formatNumber(toPhysicalX(sample.x), 3)}</td>
      <td>${formatNumber(toPhysicalY(sample.y), 3)}</td>
    </tr>
  `).join("");
}

function exportCsv() {
  if (!trackerState.samples.length) {
    return;
  }

  const unit = trackerState.scale.pixelsPerUnit ? trackerState.scale.unit : "px";
  const rows = [
    ["t_s", t("csvX", { unit }), t("csvY", { unit })],
    ...trackerState.samples.map((sample) => [
      formatNumber(sample.t, 5),
      formatNumber(toPhysicalX(sample.x), 5),
      formatNumber(toPhysicalY(sample.y), 5)
    ])
  ];

  const csv = rows.map((row) => row.join(",")).join("\n");
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = t("csvFilename");
  link.click();
  URL.revokeObjectURL(url);
}

function getAnalysisRange() {
  const duration = Number.isFinite(video.duration) ? video.duration : 0;
  const rawStart = Number.parseFloat(startTimeInput.value) || 0;
  const rawEnd = Number.parseFloat(endTimeInput.value);
  const start = clamp(rawStart, 0, Math.max(duration - 0.001, 0));
  const proposedEnd = Number.isFinite(rawEnd) && rawEnd > 0 ? rawEnd : duration;
  const end = clamp(proposedEnd, 0, duration);

  if (end <= start) {
    throw new Error(t("statusAnalysisRangeError"));
  }

  return { start, end };
}

function cancelPreviewLoop() {
  if (previewAnimationFrame) {
    cancelAnimationFrame(previewAnimationFrame);
    previewAnimationFrame = null;
  }
  previewLastTimestamp = 0;
  previewSeekPending = false;
}

function stopPreview(sync = true) {
  cancelPreviewLoop();
  if (trackerState.isPreviewing) {
    video.pause();
    trackerState.isPreviewing = false;
  }
  if (sync) {
    syncTimelineControls();
  }
}

function redrawCurrentState() {
  if (trackerState.videoWidth && trackerState.videoHeight) {
    drawFrame();
  } else {
    clearCanvasMessage("statusSelectVideo");
  }
}

function clearTrackingSelection(resetScale = true) {
  trackerState.selectedPoint = null;
  trackerState.originPoint = null;
  trackerState.referencePatch = null;
  trackerState.lastPatch = null;
  trackerState.samples = [];
  trackerState.calibrationPoints = [];
  trackerState.isCalibrating = false;
  if (resetScale) {
    trackerState.scale.pixelsPerUnit = null;
  }
  rebuildResultsView();
  trackBtn.disabled = true;
}

function enterManualMode() {
  if (!video.src) {
    setStatusKey("statusSelectVideoFirst", {}, true);
    return;
  }

  stopPreview();
  trackerState.manualMode = true;
  clearTrackingSelection(false);
  drawFrame();
  syncTimelineControls();
  setCanvasHintKey("canvasManualActive");
  setSelectionStatusKey("selectionManualActive");
  setStatusKey("statusManualOn");
}

function exitManualMode() {
  stopPreview();
  trackerState.manualMode = false;
  syncTimelineControls();
  setCanvasHintKey(trackerState.samples.length ? "canvasManualFinished" : "canvasManualOff");
  setSelectionStatusKey(
    trackerState.samples.length ? "selectionManualFinished" : "selectionManualOffNoPoint",
    { count: trackerState.samples.length }
  );
  setStatusKey(
    trackerState.samples.length ? "statusManualFinished" : "statusManualOff",
    { count: trackerState.samples.length }
  );
}

function addManualSample(point) {
  const { start, end } = getAnalysisRange();
  const sample = {
    t: clamp(getCurrentPlaybackTime(), start, end),
    x: Math.round(point.x),
    y: Math.round(point.y)
  };
  const replaceIndex = trackerState.samples.findIndex((item) => Math.abs(item.t - sample.t) <= 0.001);

  if (replaceIndex >= 0) {
    trackerState.samples[replaceIndex] = sample;
  } else {
    trackerState.samples.push(sample);
    trackerState.samples.sort((a, b) => a.t - b.t);
  }

  const firstSample = trackerState.samples[0];
  trackerState.originPoint = firstSample ? { x: firstSample.x, y: firstSample.y } : null;
  trackerState.selectedPoint = { x: sample.x, y: sample.y };
  trackerState.referencePatch = null;
  trackerState.lastPatch = null;
  rebuildResultsView();
  drawFrame();
  showSelectionToastKey("toastManualPoint");
  setSelectionStatusKey("selectionManualPoints", { count: trackerState.samples.length });
  setStatusKey("statusManualPointSaved", { time: formatTime(sample.t) });
}

function startCalibration() {
  if (!trackerState.readyForSelection) {
    setStatusKey("statusCalibrateMoveVideo", {}, true);
    return;
  }

  const distance = Number.parseFloat(scaleDistanceInput.value);
  const unit = getSpatialUnit();

  if (!Number.isFinite(distance) || distance <= 0) {
    setStatusKey("statusScaleDistancePositive", {}, true);
    return;
  }

  stopPreview();
  trackerState.isCalibrating = true;
  trackerState.calibrationPoints = [];
  trackerState.scale.distance = distance;
  trackerState.scale.unit = unit;
  scaleUnitLabel.textContent = unit;
  trackBtn.disabled = true;
  setCanvasHintKey("canvasCalibrationReady");
  setSelectionStatusKey("selectionCalibrationActive", { unit: trackerState.scale.unit });
  drawFrame();
  setStatusKey("statusCalibrationOn", { distance: formatNumber(distance, 3), unit });
}

async function startTracking() {
  if (!trackerState.selectedPoint || !trackerState.referencePatch) {
    setStatusKey("statusMarkPointFirst", {}, true);
    return;
  }

  const sampleRate = clamp(Number.parseFloat(sampleRateInput.value) || 12, 1, 60);
  const patchSize = evenToOdd(templateSizeInput.value);
  const searchRadius = clamp(Number.parseInt(searchRadiusInput.value, 10) || 28, 6, 120);
  const weights = buildPatchWeights(patchSize);
  const { start, end } = getAnalysisRange();
  const frameStep = 1 / sampleRate;
  const samplingJumpFactor = Math.max(1, 12 / sampleRate);
  const baseDynamicRadius = Math.min(240, Math.max(searchRadius, Math.ceil(searchRadius * samplingJumpFactor)));
  const sampleTimes = [];
  for (let time = start + frameStep; time < end - 0.0005; time += frameStep) {
    sampleTimes.push(time);
  }
  if (!sampleTimes.length || Math.abs(sampleTimes[sampleTimes.length - 1] - end) > 0.0005) {
    sampleTimes.push(end);
  }
  const frameCount = sampleTimes.length;
  const startPoint = trackerState.originPoint
    ? { ...trackerState.originPoint }
    : { ...trackerState.selectedPoint };
  let currentPoint = startPoint;
  let previousPatch = trackerState.referencePatch;
  let velocity = { x: 0, y: 0 };

  stopPreview();
  trackerState.isTracking = true;
  trackerState.manualMode = false;
  trackerState.isCalibrating = false;
  trackerState.calibrationPoints = [];
  trackerState.samples = [{ t: start, x: currentPoint.x, y: currentPoint.y }];
  trackerState.originPoint = { x: currentPoint.x, y: currentPoint.y };
  trackerState.selectedPoint = { x: currentPoint.x, y: currentPoint.y };
  trackBtn.disabled = true;
  calibrateBtn.disabled = true;
  setStartBtn.disabled = true;
  setEndBtn.disabled = true;
  exportBtn.disabled = true;
  resetChartsAndTable();
  setCanvasHintKey("canvasTrackingInProgress");
  setSelectionStatusKey("selectionTrackingInProgress");
  setStatusKey("statusProcessingSamples", {
    count: frameCount,
    start: formatTime(start),
    end: formatTime(end)
  });

  try {
    await seekVideo(start);
    drawFrame(currentPoint);
    syncTimelineControls();

    for (let i = 0; i < frameCount; i += 1) {
      const time = sampleTimes[i];
      await seekVideo(time);
      const frame = getGrayFrame();
      const dynamicRadius = Math.min(
        240,
        Math.max(
          baseDynamicRadius,
          Math.ceil(Math.hypot(velocity.x, velocity.y) * (1.8 + (samplingJumpFactor - 1) * 0.8)) + 10
        )
      );
      const predictedPoint = {
        x: clamp(currentPoint.x + velocity.x, 0, trackerState.videoWidth - 1),
        y: clamp(currentPoint.y + velocity.y, 0, trackerState.videoHeight - 1)
      };
      const match = findBestMatch(
        frame,
        predictedPoint,
        trackerState.referencePatch,
        previousPatch,
        patchSize,
        dynamicRadius,
        weights
      );

      if (!match.point || !match.patch) {
        throw new Error(t("statusTrackingInterrupted", { time: formatTime(time) }));
      }

      velocity = {
        x: match.point.x - currentPoint.x,
        y: match.point.y - currentPoint.y
      };
      currentPoint = match.point;
      previousPatch = blendPatches(previousPatch, match.patch);
      trackerState.samples.push({ t: time, x: currentPoint.x, y: currentPoint.y });
      drawFrame(currentPoint);
      setStatusKey("statusProcessingSample", { index: i + 1, count: frameCount });
    }

    trackerState.selectedPoint = currentPoint;
    trackerState.lastPatch = previousPatch;
    rebuildResultsView();
    calibrateBtn.disabled = false;
    setStartBtn.disabled = false;
    setEndBtn.disabled = false;
    setCanvasHintKey("canvasTrackingDone");
    setSelectionStatusKey("selectionTrackingDone", { count: trackerState.samples.length });
    setStatusKey("statusTrackingDone", { count: trackerState.samples.length });
  } catch (error) {
    setStatus(error.message, true);
  } finally {
    trackerState.isTracking = false;
    trackBtn.disabled = false;
    calibrateBtn.disabled = false;
    setStartBtn.disabled = false;
    setEndBtn.disabled = false;
    syncTimelineControls();
  }
}

async function startPreviewPlayback() {
  if (!video.src || trackerState.isTracking || trackerState.isPreviewing) {
    return;
  }

  try {
    const { start, end } = getAnalysisRange();
    const playbackRate = clamp(Number.parseFloat(playbackRateInput.value) || 1, 0.01, 3);
    video.pause();
    trackerState.isPreviewing = true;
    previewTime = clamp(video.currentTime || 0, start, end);
    if (previewTime >= end) {
      previewTime = start;
    }
    await seekVideo(previewTime);
    previewLastTimestamp = 0;
    previewSeekPending = false;
    setStatusKey("statusPlayingAtSpeed", { speed: formatNumber(playbackRate, 2) });

    const step = (timestamp) => {
      if (!trackerState.isPreviewing) {
        return;
      }

      if (!previewLastTimestamp) {
        previewLastTimestamp = timestamp;
      }

      const deltaSeconds = (timestamp - previewLastTimestamp) / 1000;
      previewLastTimestamp = timestamp;
      previewTime = clamp(previewTime + deltaSeconds * playbackRate, start, end);

      if (!previewSeekPending) {
        previewSeekPending = true;
        seekVideo(previewTime)
          .then(() => {
            previewSeekPending = false;
            drawFrame();
            syncTimelineControls();

            if (trackerState.isPreviewing && previewTime >= Math.max(end - 0.001, start)) {
              stopPreview(false);
              redrawCurrentState();
              syncTimelineControls();
              setStatusKey("statusPlaybackReachedEnd");
              return;
            }
          })
          .catch((error) => {
            previewSeekPending = false;
            stopPreview();
            setStatus(error.message, true);
          });
      }

      previewAnimationFrame = requestAnimationFrame(step);
    };

    previewAnimationFrame = requestAnimationFrame(step);
  } catch (error) {
    stopPreview();
    setStatus(error.message, true);
  }
}

function refreshAfterTransformChange() {
  if (!trackerState.sourceWidth || trackerState.isTracking || trackerState.isPreviewing) {
    return;
  }

  trackerState.readyForSelection = true;
  trackerState.manualMode = false;
  clearTrackingSelection();
  updateCanvasSizeFromTransform();
  drawFrame();
  syncTimelineControls();
  calibrateBtn.disabled = false;
  setCanvasHintKey("canvasTransformUpdated");
  setSelectionStatusKey("selectionTransformApplied");
  setStatusKey("statusOrientationUpdated");
}

videoInput.addEventListener("change", async (event) => {
  const file = event.target.files?.[0];
  resetState(false);

  if (!file) {
    disposeVideoUrl();
    video.removeAttribute("src");
    video.load();
    setStatusKey("statusSelectVideo");
    return;
  }

  disposeVideoUrl();
  objectUrl = URL.createObjectURL(file);
  video.src = objectUrl;

  try {
    await waitForVideoReady();
    trackerState.sourceWidth = video.videoWidth;
    trackerState.sourceHeight = video.videoHeight;
    updateCanvasSizeFromTransform();
    trackerState.readyForSelection = true;
    trackerState.manualMode = false;
    startTimeInput.value = "0";
    endTimeInput.value = formatNumber(video.duration, 2);
    playbackRateInput.value = "1";
    scaleUnitLabel.textContent = getSpatialUnit();
    manualModeBtn.disabled = false;
    calibrateBtn.disabled = false;
    setStartBtn.disabled = false;
    setEndBtn.disabled = false;
    await seekAndRender(0);
    syncTimelineControls();
    setCanvasHintKey("canvasVideoReady");
    setSelectionStatusKey("selectionVideoLoaded");
    setStatusKey("statusVideoLoaded");
  } catch (error) {
    setStatus(error.message || t("statusVideoReadyError"), true);
  }
});

manualModeBtn.addEventListener("click", () => {
  if (trackerState.manualMode) {
    exitManualMode();
    return;
  }
  enterManualMode();
});
calibrateBtn.addEventListener("click", startCalibration);
playPauseBtn.addEventListener("click", async () => {
  if (trackerState.isPreviewing) {
    stopPreview();
    redrawCurrentState();
    setStatusKey("statusPlaybackStopped");
    return;
  }
  await startPreviewPlayback();
});
trackBtn.addEventListener("click", startTracking);
resetBtn.addEventListener("click", async () => {
  stopPreview();
  resetState(Boolean(video.src));
  if (video.src) {
    trackerState.sourceWidth = video.videoWidth;
    trackerState.sourceHeight = video.videoHeight;
    updateCanvasSizeFromTransform();
    trackerState.readyForSelection = true;
    trackerState.manualMode = false;
    manualModeBtn.disabled = false;
    calibrateBtn.disabled = false;
    setStartBtn.disabled = false;
    setEndBtn.disabled = false;
    try {
      await seekAndRender(Number.parseFloat(startTimeInput.value) || 0);
      setCanvasHintKey("canvasAtStart");
      setSelectionStatusKey("selectionNoPoint");
      setStatusKey("statusResetDone");
    } catch (error) {
      drawFrame();
      syncTimelineControls();
      setStatus(error.message, true);
    }
  } else {
    setStatusKey("statusSelectVideo");
  }
});
exportBtn.addEventListener("click", exportCsv);
fitToggleInput.addEventListener("change", (event) => {
  trackerState.showTheoreticalFit = Boolean(event.target.checked) && Boolean(trackerState.theoreticalFit);
  rebuildResultsView();
  redrawCurrentState();
});
document.addEventListener("click", (event) => {
  const button = event.target.closest(".info-button");
  if (button) {
    const tooltip = button.nextElementSibling;
    const isOpen = button.getAttribute("aria-expanded") === "true";
    closeInfoTooltips();

    if (!isOpen && tooltip?.classList.contains("info-tooltip")) {
      button.setAttribute("aria-expanded", "true");
      tooltip.hidden = false;
    }
    return;
  }

  closeInfoTooltips();
});
timelineRange.addEventListener("input", async () => {
  if (!video.src || trackerState.isTracking) {
    return;
  }
  const targetTime = Number.parseFloat(timelineRange.value) || 0;
  timelineCurrentLabel.textContent = formatTime(targetTime);
  stopPreview(false);
  try {
    await seekAndRender(targetTime);
  } catch (error) {
    setStatus(error.message, true);
  }
});
setStartBtn.addEventListener("click", () => {
  const duration = Number.isFinite(video.duration) ? video.duration : 0;
  const rawTime = clamp(video.currentTime || 0, 0, duration);
  const currentEnd = Number.parseFloat(endTimeInput.value) || duration;
  const nextStart = Math.min(rawTime, Math.max(currentEnd - 0.01, 0));
  startTimeInput.value = formatNumber(nextStart, 2);
  if (currentEnd <= nextStart) {
    endTimeInput.value = formatNumber(clamp(nextStart + 0.1, 0, duration), 2);
  }
  syncTimelineControls();
  setStatusKey("statusStartFixed", { time: formatTime(Number.parseFloat(startTimeInput.value) || 0) });
});
setEndBtn.addEventListener("click", async () => {
  const duration = Number.isFinite(video.duration) ? video.duration : 0;
  const rawTime = clamp(video.currentTime || 0, 0, duration);
  const currentStart = Number.parseFloat(startTimeInput.value) || 0;
  const nextEnd = Math.max(rawTime, Math.min(currentStart + 0.01, duration));
  endTimeInput.value = formatNumber(nextEnd, 2);
  if (nextEnd <= currentStart) {
    startTimeInput.value = formatNumber(clamp(nextEnd - 0.1, 0, duration), 2);
  }
  try {
    await seekAndRender(Number.parseFloat(startTimeInput.value) || 0);
    setCanvasHintKey("canvasAtStart");
    setStatusKey("statusEndFixed", { time: formatTime(Number.parseFloat(endTimeInput.value) || 0) });
  } catch (error) {
    syncTimelineControls();
    setStatus(error.message, true);
  }
});
jumpStartBtn.addEventListener("click", async () => {
  if (!video.src || trackerState.isTracking) {
    return;
  }
  stopPreview(false);
  try {
    await seekAndRender(Number.parseFloat(startTimeInput.value) || 0);
    setCanvasHintKey("canvasAtStart");
    setStatusKey("statusJumpedToStart", { time: formatTime(Number.parseFloat(startTimeInput.value) || 0) });
  } catch (error) {
    setStatus(error.message, true);
  }
});
jumpEndBtn.addEventListener("click", async () => {
  if (!video.src || trackerState.isTracking) {
    return;
  }
  stopPreview(false);
  try {
    await seekAndRender(Number.parseFloat(endTimeInput.value) || 0);
    setCanvasHintKey("canvasAtEnd");
    setStatusKey("statusJumpedToEnd", { time: formatTime(Number.parseFloat(endTimeInput.value) || 0) });
  } catch (error) {
    setStatus(error.message, true);
  }
});
themeToggleBtn.addEventListener("click", () => {
  const currentTheme = document.documentElement.dataset.theme || "light";
  applyTheme(currentTheme === "dark" ? "light" : "dark");
});

languageSelect.addEventListener("change", (event) => {
  applyLanguage(event.target.value || "auto");
});

scaleUnitInput.addEventListener("input", () => {
  const unit = getSpatialUnit();
  scaleUnitLabel.textContent = unit;
  trackerState.scale.unit = unit;
  if (trackerState.samples.length) {
    rebuildResultsView();
    redrawCurrentState();
  }
});
scaleDistanceInput.addEventListener("input", () => {
  const distance = Number.parseFloat(scaleDistanceInput.value);

  if (!Number.isFinite(distance) || distance <= 0) {
    return;
  }

  trackerState.scale.distance = distance;

  if (trackerState.calibrationPoints.length === 2) {
    const [pointA, pointB] = trackerState.calibrationPoints;
    const pixelDistance = getDistance(pointA, pointB);

    if (pixelDistance > 0) {
      trackerState.scale.pixelsPerUnit = pixelDistance / distance;
      rebuildResultsView();
      redrawCurrentState();
      setStatusKey("statusScaleUpdated", {
        value: formatNumber(trackerState.scale.pixelsPerUnit, 3),
        unit: trackerState.scale.unit
      });
    }
  }
});
startTimeInput.addEventListener("input", syncTimelineControls);
endTimeInput.addEventListener("input", syncTimelineControls);

orientationSelect.addEventListener("change", refreshAfterTransformChange);
flipHorizontalInput.addEventListener("change", refreshAfterTransformChange);
flipVerticalInput.addEventListener("change", refreshAfterTransformChange);

video.addEventListener("pause", () => {
  if (!trackerState.isTracking && trackerState.isPreviewing) {
    trackerState.isPreviewing = false;
    cancelPreviewLoop();
    syncTimelineControls();
  }
});
video.addEventListener("ended", () => {
  if (trackerState.isPreviewing) {
    trackerState.isPreviewing = false;
    cancelPreviewLoop();
    syncTimelineControls();
    redrawCurrentState();
    setStatusKey("statusPlaybackCompleted");
  }
});

canvas.addEventListener("click", (event) => {
  if (!trackerState.readyForSelection || trackerState.isTracking || (trackerState.isPreviewing && !trackerState.manualMode)) {
    return;
  }

  const point = getCanvasPoint(event);

  if (trackerState.isCalibrating) {
    trackerState.calibrationPoints.push({
      x: Math.round(point.x),
      y: Math.round(point.y)
    });

    if (trackerState.calibrationPoints.length === 2) {
      const [pointA, pointB] = trackerState.calibrationPoints;
      const pixelDistance = getDistance(pointA, pointB);

      if (pixelDistance <= 0) {
        trackerState.calibrationPoints = [];
        trackerState.isCalibrating = false;
        setStatusKey("statusScaleInvalid", {}, true);
        drawFrame();
        return;
      }

      trackerState.scale.pixelsPerUnit = pixelDistance / trackerState.scale.distance;
      trackerState.isCalibrating = false;
      rebuildResultsView();
      drawFrame();
      setCanvasHintKey("canvasScaleReady");
      setSelectionStatusKey("selectionScaleReady");
      showSelectionToastKey("toastScaleCalibrated");
      setStatusKey("statusScaleCalibrated", {
        value: formatNumber(trackerState.scale.pixelsPerUnit, 3),
        unit: trackerState.scale.unit
      });
      if (trackerState.selectedPoint) {
        trackBtn.disabled = false;
      }
    } else {
      drawFrame();
      setSelectionStatusKey("selectionCalibrationHalf");
      showSelectionToastKey("toastCalibrationPoint");
      setStatusKey("statusCalibrationFirstPoint");
    }
    return;
  }

  if (trackerState.manualMode) {
    addManualSample(point);
    return;
  }

  if (trackerState.samples.length) {
    clearTrackingSelection(false);
  }

  const patchSize = evenToOdd(templateSizeInput.value);
  const frame = getGrayFrame();
  const patch = extractPatch(frame, point.x, point.y, patchSize);

  if (!patch) {
    setStatusKey("statusPointNearEdge", {}, true);
    return;
  }

  trackerState.selectedPoint = {
    x: Math.round(point.x),
    y: Math.round(point.y)
  };
  trackerState.originPoint = {
    x: trackerState.selectedPoint.x,
    y: trackerState.selectedPoint.y
  };
  trackerState.referencePatch = patch;
  trackerState.lastPatch = patch;
  drawFrame();
  trackBtn.disabled = false;
  setCanvasHintKey("canvasInitialPointReady");
  setSelectionStatusKey("selectionPointReady");
  showSelectionToastKey("toastPointMarked");
  const unit = trackerState.scale.pixelsPerUnit ? trackerState.scale.unit : "px";
  setStatusKey("statusPointReady", { unit });
});

window.addEventListener("beforeunload", disposeVideoUrl);

themeMediaQuery.addEventListener("change", (event) => {
  if (getStoredTheme()) {
    return;
  }
  applyTheme(event.matches ? "dark" : "light", false);
});

applyTheme(getPreferredTheme(), false);
applyLanguage(getStoredLanguagePreference(), false);
