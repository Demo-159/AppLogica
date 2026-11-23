package app.razona.logica;

import android.os.Bundle;
import android.view.WindowManager;
import android.webkit.JavascriptInterface;
import android.webkit.WebView;
import com.getcapacitor.BridgeActivity;

/**
 * Razona muestra la app web (assets/public) en un WebView, sin conexión.
 * Igual que Ruta B: la voz del tutor avanza sola entre frases y, durante una sesión con tutor
 * (que avanza como un video, sin tocar la pantalla), la pantalla no se apaga.
 */
public class MainActivity extends BridgeActivity {
    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        WebView web = getBridge().getWebView();
        web.getSettings().setMediaPlaybackRequiresUserGesture(false);
        web.addJavascriptInterface(new Pantalla(), "RazonaAndroid");
    }

    /** Desde la página: RazonaAndroid.encendida(true) al empezar una sesión, false al volver al mapa. */
    private class Pantalla {
        @JavascriptInterface
        public void encendida(boolean si) {
            runOnUiThread(() -> {
                if (si) getWindow().addFlags(WindowManager.LayoutParams.FLAG_KEEP_SCREEN_ON);
                else getWindow().clearFlags(WindowManager.LayoutParams.FLAG_KEEP_SCREEN_ON);
            });
        }
    }
}
