import sys
import os
from moviepy.editor import VideoFileClip

def convert_mp4_to_mp3(input_path, output_path):
    """
    Convertit un fichier MP4 en MP3.
    """
    try:
        # Charger le clip vidéo
        video_clip = VideoFileClip(input_path)
        
        # Extraire l'audio
        audio_clip = video_clip.audio
        
        # Écrire l'audio dans un fichier MP3
        audio_clip.write_audiofile(output_path)
        
        # Fermer les clips pour libérer les ressources
        audio_clip.close()
        video_clip.close()
        
        print(f"Succès: '{input_path}' converti en '{output_path}'")
        return True
    except Exception as e:
        print(f"Erreur lors de la conversion: {e}", file=sys.stderr)
        return False

# Exemple d'utilisation (à intégrer dans un framework web comme Flask ou FastAPI)
if __name__ == "__main__":
    # Ceci est un exemple si le script est appelé directement
    if len(sys.argv) != 3:
        print("Usage: python converter.py <input_mp4_path> <output_mp3_path>", file=sys.stderr)
        sys.exit(1)
        
    input_file = sys.argv[1]
    output_file = sys.argv[2]

    # S'assurer que les fichiers existent
    if not os.path.exists(input_file):
        print(f"Erreur: Le fichier d'entrée '{input_file}' n'existe pas.", file=sys.stderr)
        sys.exit(1)

    convert_mp4_to_mp3(input_file, output_file)
