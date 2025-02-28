import { defineConfig } from "@rsbuild/core";
import { pluginBabel } from "@rsbuild/plugin-babel";
import { pluginSolid } from "@rsbuild/plugin-solid";

export default defineConfig({
    plugins: [
        pluginBabel({
            include: /\.(?:jsx|tsx)$/,
        }),
        pluginSolid(),
    ],
    server: {
        port: 5173,
        proxy: {
            "/api": "http://localhost:5000",
            "/images": "http://localhost:5000/images"
        }
    },
    performance: {
        buildCache: false
    }
});
