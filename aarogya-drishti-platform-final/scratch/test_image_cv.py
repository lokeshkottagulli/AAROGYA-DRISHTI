import io
import numpy as np
from PIL import Image

def analyze_oral_image_pixels(img: Image.Image) -> dict:
    img_rgb = img.convert("RGB").resize((300, 200))
    arr = np.asarray(img_rgb, dtype=np.float32)
    
    r = arr[:, :, 0]
    g = arr[:, :, 1]
    b = arr[:, :, 2]
    
    # Redness ratio: R / (G + B + 1)
    redness_ratio = r / (g + b + 1.0)
    
    # Whiteness: high brightness and low color saturation
    luminance = 0.299 * r + 0.587 * g + 0.114 * b
    max_c = np.maximum(np.maximum(r, g), b)
    min_c = np.minimum(np.minimum(r, g), b)
    saturation = (max_c - min_c) / (max_c + 1e-5)
    whiteness = (luminance / 255.0) * (1.0 - saturation)
    
    # Gradient magnitude (texture roughness & edges)
    gy, gx = np.gradient(luminance)
    grad_mag = np.sqrt(gx**2 + gy**2)
    
    # High-risk: Erythema (red lesion) with texture irregularity or ulceration
    ulcer_mask = (redness_ratio > 1.25) & (grad_mag > 4.0)
    erythema_density = float(np.mean(redness_ratio > 1.35))
    white_plaque_mask = (whiteness > 0.40) & (luminance > 130)
    
    ulcer_density = float(np.mean(ulcer_mask))
    plaque_density = float(np.mean(white_plaque_mask))
    avg_grad = float(np.mean(grad_mag))
    
    # Determine risk category
    if ulcer_density > 0.04 or erythema_density > 0.15 or (plaque_density > 0.04 and ulcer_density > 0.02) or avg_grad > 9.0:
        score = min(0.945, max(0.760, 0.780 + ulcer_density * 1.8 + erythema_density * 0.4))
        label = "SUSPICIOUS"
        morphology = "Speckled Erythro-leukoplakia"
        triage = "Priority MO Review < 24h"
    elif plaque_density > 0.05 or erythema_density > 0.05 or avg_grad > 5.0:
        score = min(0.680, max(0.440, 0.480 + plaque_density * 1.2 + avg_grad * 0.01))
        label = "MODERATE"
        morphology = "Homogeneous Leukoplakia"
        triage = "PHC Inspection in 7 Days"
    else:
        score = min(0.250, max(0.080, 0.080 + avg_grad * 0.005))
        label = "LOW"
        morphology = "Healthy Normochromic Mucosa"
        triage = "Routine Habit Cessation Counseling"
        
    # Region of Interest (ROI) Localization
    if label != "LOW":
        anomaly_map = (redness_ratio * 1.5 + whiteness * 1.8 + (grad_mag / 10.0))
        thresh = np.percentile(anomaly_map, 82)
        y_indices, x_indices = np.where(anomaly_map >= thresh)
        if len(x_indices) > 15:
            min_x = max(20, int(np.percentile(x_indices, 10) * (600 / 300)))
            max_x = min(580, int(np.percentile(x_indices, 90) * (600 / 300)))
            min_y = max(20, int(np.percentile(y_indices, 10) * (320 / 200)))
            max_y = min(300, int(np.percentile(y_indices, 90) * (320 / 200)))
            w = max(110, min(260, max_x - min_x))
            h = max(80, min(200, max_y - min_y))
            cx = (min_x + max_x) // 2
            cy = (min_y + max_y) // 2
            bbox = {
                "x": max(15, min(600 - w - 15, cx - w // 2)),
                "y": max(15, min(320 - h - 15, cy - h // 2)),
                "width": w,
                "height": h
            }
        else:
            bbox = {"x": 190, "y": 102, "width": 156, "height": 106}
    else:
        bbox = None
        
    return {
        "score": round(score, 3),
        "label": label,
        "morphology": morphology,
        "triage": triage,
        "bbox": bbox
    }

# Test 1: Red ulcer / erythroleukoplakia
arr1 = np.full((200, 300, 3), [190, 70, 80], dtype=np.uint8)
arr1[60:140, 80:200, 0] = 235
arr1[60:140, 80:200, 1] = 40
arr1[60:140, 80:200, 2] = 50
arr1[80:120, 110:160, :] = [245, 230, 220]
img1 = Image.fromarray(arr1)
print("1. Ulcer/Erythroleukoplakia:", analyze_oral_image_pixels(img1))

# 2. White leukoplakia
arr2 = np.full((200, 300, 3), [190, 100, 110], dtype=np.uint8)
arr2[70:130, 90:210] = [245, 245, 235]
img2 = Image.fromarray(arr2)
print("2. Leukoplakia:", analyze_oral_image_pixels(img2))

# 3. Healthy mucosa
arr3 = np.full((200, 300, 3), [205, 125, 135], dtype=np.uint8)
img3 = Image.fromarray(arr3)
print("3. Healthy mucosa:", analyze_oral_image_pixels(img3))
