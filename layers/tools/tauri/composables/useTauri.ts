import {
  isPermissionGranted,
  requestPermission,
  sendNotification,
} from '@tauri-apps/api/notification'
import { WebviewWindow } from '@tauri-apps/api/window'
import { invoke } from '@tauri-apps/api/tauri'

export default function useTauri() {
  const notify = async (title: any, body: any) => {
    let permissionGranteds = await isPermissionGranted()

    if (!permissionGranteds) {
      const permission = requestPermission()
      permissionGranteds = (await permission) === 'granted'
    }
    if (permissionGranteds) {
      sendNotification({
        title: title,
        body: body,
      })
    }
  }

  const newWindow = (
    url: string,
    title: string,
    width: number = 300,
    height: number = 300,
    resizable: boolean = false,
  ) => {
    const webview = new WebviewWindow(title.replace(' ', '-'), {
      url: url,
      width: width,
      height: height,
      resizable: true,
      title: title,
    })
    webview.once('tauri://created', function () {
      // webview window successfully created
    })
    webview.once('tauri://error', function (e) {
      // an error happened creating the webview window
    })
  }

  const test = async () => {
    const result = await invoke('my_custom_command', {
      message: 'Hello from the webview!',
    })
    console.log(result) // Hello from the webview!
  }

  const build_application = async (
    target_dir: string,
    project_id: string,
    project_types: any,
    selected_project: string
  ) => {
    console.log(
      'Building application...',
      target_dir,
      project_id,
      project_types,
      selected_project
    )
    invoke('application_build', {
      targetDir: target_dir,
      projectId: project_id,
      projectTypes: project_types,
      selectedProject: selected_project
    }).then(() => console.log('Completed!'))
    // invoke("my_custom_command_pass", {
    //   invokeMessage: "Hello!",
    //   invokeMessages: "Bey!",
    //   projectTypes: project_types,
    // })
  }

  const test_invoke = async () => {
    invoke('my_custom_command2').then((result) => {
      console.log(result)
    })
  }

  return { notify, newWindow, test, test_invoke, build_application }
}
