'use client'

import { createContext, useContext, useState } from 'react'

const AppStateContext = createContext()

export const useAppState = () => useContext(AppStateContext)

export const AppStateProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [workspaces, setWorkspaces] = useState([])
  const [currentWorkspace, setCurrentWorkspace] = useState(null)
  const [currentTab, setCurrentTab] = useState('home')
  const [channels, setChannels] = useState([])
  const [currentChannel, setCurrentChannel] = useState(null)
  const [messages, setMessages] = useState({
    channels: {}, // { channelId: [message1, message2, ...] }
    dms: {}, // { userId: [message1, message2, ...] }
  })

  const addChannelMessage = (channelId, message) => {
    setMessages(prevMessages => ({
      ...prevMessages,
      channels: {
        ...prevMessages.channels,
        [channelId]: [...(prevMessages.channels[channelId] || []), message],
      },
    }))
  }

  const addDMMessage = (userId, message) => {
    setMessages(prevMessages => ({
      ...prevMessages,
      dms: {
        ...prevMessages.dms,
        [userId]: [...(prevMessages.dms[userId] || []), message],
      },
    }))
  }

  return (
    <AppStateContext.Provider
      value={{
        user,
        setUser,
        workspaces,
        setWorkspaces,
        currentWorkspace,
        setCurrentWorkspace,
        currentTab,
        setCurrentTab,
        channels,
        setChannels,
        currentChannel,
        setCurrentChannel,
        messages,
        addChannelMessage,
        addDMMessage,
      }}
    >
      {children}
    </AppStateContext.Provider>
  )
}
