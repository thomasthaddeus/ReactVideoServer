import ffmpeg
import subprocess

def get_video_duration(filename):
    result = subprocess.run(['ffprobe', '-v', 'error', '-show_entries',
                             'format=duration', '-of',
                             'default=noprint_wrappers=1:nokey=1', filename],
    stdout=subprocess.PIPE,
    stderr=subprocess.STDOUT,
    check=False)
    return float(result.stdout)

def remove_time_from_end(input_file, output_file, end_time):
    duration = get_video_duration(input_file)
    new_duration = duration - end_time

    (
        ffmpeg
        .input(input_file)
        .output(output_file, t=new_duration, c="copy")
        .run()
    )

FILE_IN = './3284-Rebarrel_Blueprint-Part1.mp4'
FILE_OUT = './out/3284-Rebarrel_Blueprint-Part1.mp4'
TIME_END = 40  # Time to remove from the end in seconds
remove_time_from_end(FILE_IN, FILE_OUT, TIME_END)
