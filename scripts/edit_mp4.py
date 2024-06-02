import ffmpeg

def remove_time_from_beginning(input_file, output_file, start_time):
    (
        ffmpeg
        .input(input_file, ss=start_time)
        .output(output_file)
        .run()
    )

file_in = '3284-Rebarrel&Blueprint-Part2.mp4'
file_out = './out/3284-Rebarrel&Blueprint-Part2.mp4'
start = '00:16:30'  # Time to remove from the beginning (format: HH:MM:SS)
remove_time_from_beginning(file_in, file_out, start)
