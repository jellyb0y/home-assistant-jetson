def wait_for_params(func):
    while True:
        input_line = input()
        paths = input_line.split(':')
        
        if len(paths) != 2:
            raise Exception('Could not parse paths')

        try:
            func_result = func(*paths)
            print('success')
        except Exception as exception:
            print(exception)
            raise exception

        if func_result:
            break
