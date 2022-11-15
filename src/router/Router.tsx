import { observer } from 'mobx-react-lite';import React, { useEffect } from 'react';import { Route, Routes, useLocation } from 'react-router-dom';import AuthStore from 'store/AuthStore';import BaseStore from 'store/BaseStore';import { LoadingEnum } from 'store/Type/models';import { useCustomNavigate } from 'utils/hooks/useCustomNav';import { ForgotPassword } from 'view/pages/ForgotPassword/ForgotPassword';import { Home } from 'view/pages/Home/Home';import { Login } from 'view/pages/Login/Login';import { NotFound } from 'view/pages/NotFound/NotFound';import { UniversalLoader } from '../view/components/Atoms/UniversalLoader/UniversalLoader';import { ChartSpace } from '../view/pages/ChartSpace/ChartSpace';import { Layout } from '../view/pages/Layout/Layout';import { Register } from '../view/pages/Register/Register';import { Settings } from '../view/pages/Settings/settings';import { Wallets } from '../view/pages/Wallets/Wallets';import { WorkSpace } from '../view/pages/WorkSpace/WorkSpace';export const Router = observer((): React.ReactElement => {	const { isLoading, setIsLoading } = BaseStore;	const { checkAuth, isAuth } = AuthStore;	const { goTo } = useCustomNavigate();	const location = useLocation();	useEffect(() => {		const token = localStorage.getItem('token');		if (token) {			setIsLoading(LoadingEnum.fetching);			checkAuth().finally(() => {				setIsLoading(LoadingEnum.success);			});		}		goTo('/');	}, []);	if (isLoading === LoadingEnum.fetching) {		return <UniversalLoader />;	}	return (		<Routes location={location}>			{isAuth ? (				<>					<Route path={'/'} element={<Layout />}>						<Route index element={<Wallets />} />						<Route path={'/work-space'} element={<WorkSpace />} />						<Route path={'/settings'} element={<Settings />} />						<Route path={'/chart-space'} element={<ChartSpace />} />					</Route>				</>			) : (				<>					<Route path={'/'} element={<Home />} />					<Route path={'/login'} element={<Login />} />					<Route path={'/new-user'} element={<Register />} />					<Route path={'/forgot-password'} element={<ForgotPassword />} />				</>			)}			<Route path={'*'} element={<NotFound />} />		</Routes>	);});