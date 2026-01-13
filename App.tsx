import React, { useState } from 'react';
import { EventHeader } from './components/EventHeader';
import { EventContent } from './components/EventContent';
import { INITIAL_EVENT_DATA } from './constants';
import { EventDetails } from './types';
import { refineEventContent } from './services/geminiService';
import { CalendarPlus, Navigation, X, Calendar, Download, MapPin } from 'lucide-react';

const App: React.FC = () => {
  const [eventData, setEventData] = useState<EventDetails>(INITIAL_EVENT_DATA);
  const [isRefining, setIsRefining] = useState(false);
  const [showCalendarModal, setShowCalendarModal] = useState(false);
  const [showNavModal, setShowNavModal] = useState(false);

  const handleRefineContent = async () => {
    if (isRefining) return;
    setIsRefining(true);
    try {
      const refined = await refineEventContent(eventData);
      if (refined) {
        setEventData(prev => ({
          ...prev,
          ...refined
        }));
      }
    } catch (e) {
      console.error("Error refining content", e);
    } finally {
      setIsRefining(false);
    }
  };

  // 餐厅坐标 (阿红私房菜 新都汇店)
  const venueLocation = {
    lat: 31.1587,
    lng: 120.6463,
    name: eventData.venue.name,
    address: eventData.venue.address
  };

  // 高德地图
  const handleAMapNav = () => {
    const url = `https://uri.amap.com/marker?position=${venueLocation.lng},${venueLocation.lat}&name=${encodeURIComponent(venueLocation.name)}&coordinate=gaode&callnative=1`;
    window.open(url, '_blank');
    setShowNavModal(false);
  };

  // 百度地图
  const handleBaiduNav = () => {
    const url = `https://api.map.baidu.com/marker?location=${venueLocation.lat},${venueLocation.lng}&title=${encodeURIComponent(venueLocation.name)}&content=${encodeURIComponent(venueLocation.address)}&output=html&coord_type=gcj02`;
    window.open(url, '_blank');
    setShowNavModal(false);
  };

  // 腾讯地图
  const handleTencentNav = () => {
    const url = `https://apis.map.qq.com/uri/v1/marker?marker=coord:${venueLocation.lat},${venueLocation.lng};title:${encodeURIComponent(venueLocation.name)};addr:${encodeURIComponent(venueLocation.address)}&referer=silkroad`;
    window.open(url, '_blank');
    setShowNavModal(false);
  };

  // Apple/Google 地图 (通用)
  const handleGenericNav = () => {
    const query = encodeURIComponent(`${venueLocation.address} ${venueLocation.name}`);
    window.open(`https://maps.google.com/maps?q=${venueLocation.lat},${venueLocation.lng}`, '_blank');
    setShowNavModal(false);
  };

  // 事件信息
  const eventInfo = {
    title: `${eventData.title} - ${eventData.subtitle}`,
    description: eventData.introText,
    location: `${eventData.venue.name}, ${eventData.venue.address}`,
    startDate: '2026-01-16T17:00:00',
    endDate: '2026-01-16T21:30:00',
  };

  // Google 日历
  const handleGoogleCalendar = () => {
    const startTime = '20260116T090000Z'; // UTC 时间 (北京时间 17:00 = UTC 09:00)
    const endTime = '20260116T133000Z';   // UTC 时间 (北京时间 21:30 = UTC 13:30)

    const googleUrl = new URL('https://calendar.google.com/calendar/render');
    googleUrl.searchParams.set('action', 'TEMPLATE');
    googleUrl.searchParams.set('text', eventInfo.title);
    googleUrl.searchParams.set('details', eventInfo.description);
    googleUrl.searchParams.set('location', eventInfo.location);
    googleUrl.searchParams.set('dates', `${startTime}/${endTime}`);

    window.open(googleUrl.toString(), '_blank');
    setShowCalendarModal(false);
  };

  // Apple 日历 / 其他日历 - 使用 data URI 直接打开
  const handleAppleCalendar = () => {
    const startTime = "20260116T170000";
    const endTime = "20260116T213000";

    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Silk Road Event//CN',
      'BEGIN:VEVENT',
      `DTSTART;TZID=Asia/Shanghai:${startTime}`,
      `DTEND;TZID=Asia/Shanghai:${endTime}`,
      `SUMMARY:${eventInfo.title}`,
      `DESCRIPTION:${eventInfo.description.replace(/\n/g, '\\n')}`,
      `LOCATION:${eventInfo.location}`,
      'END:VEVENT',
      'END:VCALENDAR'
    ].join('\r\n');

    // 使用 data URI 直接触发系统日历
    const dataUri = 'data:text/calendar;charset=utf-8,' + encodeURIComponent(icsContent);
    window.open(dataUri, '_self');
    setShowCalendarModal(false);
  };

  // 下载 ICS 文件
  const handleDownloadICS = () => {
    const startTime = "20260116T170000";
    const endTime = "20260116T213000";

    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Silk Road Event//CN',
      'BEGIN:VEVENT',
      `DTSTART;TZID=Asia/Shanghai:${startTime}`,
      `DTEND;TZID=Asia/Shanghai:${endTime}`,
      `SUMMARY:${eventInfo.title}`,
      `DESCRIPTION:${eventInfo.description.replace(/\n/g, '\\n')}`,
      `LOCATION:${eventInfo.location}`,
      'END:VEVENT',
      'END:VCALENDAR'
    ].join('\r\n');

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'silk_road_event.ics');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
    setShowCalendarModal(false);
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 max-w-md mx-auto relative shadow-2xl overflow-hidden">

      {/* Scrollable Content Area */}
      <div className="h-full overflow-y-auto no-scrollbar pb-24 bg-slate-50">
        <EventHeader
          title={eventData.title}
          subtitle={eventData.subtitle}
          date={eventData.date}
          timeLabel={eventData.timeLabel}
          weather={eventData.weather}
          musicUrl={eventData.musicUrl}
        />
        <EventContent
          details={eventData}
          onRefine={handleRefineContent}
          isRefining={isRefining}
          onNavigate={() => setShowNavModal(true)}
        />
      </div>

      {/* Sticky Bottom Action Bar */}
      <div className="absolute bottom-0 left-0 w-full px-6 py-4 bg-white border-t border-slate-100 z-50 flex space-x-4 shadow-[0_-4px_20px_rgba(0,0,0,0.05)]">
        <button
          onClick={() => setShowCalendarModal(true)}
          className="flex-1 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold py-3.5 rounded-xl shadow-sm flex items-center justify-center space-x-2 transition-all active:scale-[0.98]"
        >
          <CalendarPlus className="w-5 h-5 text-slate-500" />
          <span className="text-sm">加入日历</span>
        </button>
        <button
          onClick={() => setShowNavModal(true)}
          className="flex-[2] bg-silk-blue hover:bg-blue-800 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-blue-900/20 flex items-center justify-center space-x-2 transition-all active:scale-[0.98]"
        >
          <Navigation className="w-5 h-5 text-white/90" />
          <span className="text-sm tracking-wide">一键导航到餐厅</span>
        </button>
      </div>

      {/* Calendar Selection Modal */}
      {showCalendarModal && (
        <div
          className="fixed inset-0 bg-black/50 z-[100] flex items-end justify-center"
          onClick={() => setShowCalendarModal(false)}
        >
          <div
            className="bg-white w-full max-w-md rounded-t-3xl p-6 pb-8 animate-slide-up"
            onClick={(e) => e.stopPropagation()}
            style={{
              animation: 'slideUp 0.3s ease-out'
            }}
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-slate-800">添加到日历</h3>
              <button
                onClick={() => setShowCalendarModal(false)}
                className="p-2 hover:bg-slate-100 rounded-full transition-colors"
              >
                <X className="w-5 h-5 text-slate-500" />
              </button>
            </div>

            {/* Calendar Options */}
            <div className="space-y-3">
              {/* Google Calendar */}
              <button
                onClick={handleGoogleCalendar}
                className="w-full flex items-center gap-4 p-4 bg-slate-50 hover:bg-slate-100 rounded-xl transition-all active:scale-[0.98]"
              >
                <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center">
                  <svg viewBox="0 0 24 24" className="w-7 h-7">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                  </svg>
                </div>
                <div className="text-left flex-1">
                  <div className="font-semibold text-slate-800">Google 日历</div>
                  <div className="text-sm text-slate-500">在浏览器中打开</div>
                </div>
              </button>

              {/* Apple Calendar */}
              <button
                onClick={handleAppleCalendar}
                className="w-full flex items-center gap-4 p-4 bg-slate-50 hover:bg-slate-100 rounded-xl transition-all active:scale-[0.98]"
              >
                <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center">
                  <Calendar className="w-7 h-7 text-red-500" />
                </div>
                <div className="text-left flex-1">
                  <div className="font-semibold text-slate-800">Apple 日历</div>
                  <div className="text-sm text-slate-500">适用于 iPhone / Mac</div>
                </div>
              </button>

              {/* Download ICS */}
              <button
                onClick={handleDownloadICS}
                className="w-full flex items-center gap-4 p-4 bg-slate-50 hover:bg-slate-100 rounded-xl transition-all active:scale-[0.98]"
              >
                <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center">
                  <Download className="w-7 h-7 text-blue-500" />
                </div>
                <div className="text-left flex-1">
                  <div className="font-semibold text-slate-800">下载日历文件</div>
                  <div className="text-sm text-slate-500">ICS 格式，通用兼容</div>
                </div>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Navigation Selection Modal */}
      {showNavModal && (
        <div
          className="fixed inset-0 bg-black/50 z-[100] flex items-end justify-center"
          onClick={() => setShowNavModal(false)}
        >
          <div
            className="bg-white w-full max-w-md rounded-t-3xl p-6 pb-8"
            onClick={(e) => e.stopPropagation()}
            style={{
              animation: 'slideUp 0.3s ease-out'
            }}
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-slate-800">选择导航应用</h3>
              <button
                onClick={() => setShowNavModal(false)}
                className="p-2 hover:bg-slate-100 rounded-full transition-colors"
              >
                <X className="w-5 h-5 text-slate-500" />
              </button>
            </div>

            {/* Navigation Options */}
            <div className="space-y-3">
              {/* 高德地图 */}
              <button
                onClick={handleAMapNav}
                className="w-full flex items-center gap-4 p-4 bg-slate-50 hover:bg-slate-100 rounded-xl transition-all active:scale-[0.98]"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-sm flex items-center justify-center">
                  <span className="text-white font-bold text-lg">高德</span>
                </div>
                <div className="text-left flex-1">
                  <div className="font-semibold text-slate-800">高德地图</div>
                  <div className="text-sm text-slate-500">推荐 · 国内首选</div>
                </div>
              </button>

              {/* 百度地图 */}
              <button
                onClick={handleBaiduNav}
                className="w-full flex items-center gap-4 p-4 bg-slate-50 hover:bg-slate-100 rounded-xl transition-all active:scale-[0.98]"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-xl shadow-sm flex items-center justify-center">
                  <span className="text-white font-bold text-lg">百度</span>
                </div>
                <div className="text-left flex-1">
                  <div className="font-semibold text-slate-800">百度地图</div>
                  <div className="text-sm text-slate-500">智能导航</div>
                </div>
              </button>

              {/* 腾讯地图 */}
              <button
                onClick={handleTencentNav}
                className="w-full flex items-center gap-4 p-4 bg-slate-50 hover:bg-slate-100 rounded-xl transition-all active:scale-[0.98]"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl shadow-sm flex items-center justify-center">
                  <span className="text-white font-bold text-lg">腾讯</span>
                </div>
                <div className="text-left flex-1">
                  <div className="font-semibold text-slate-800">腾讯地图</div>
                  <div className="text-sm text-slate-500">微信内置</div>
                </div>
              </button>

              {/* Apple/Google 地图 */}
              <button
                onClick={handleGenericNav}
                className="w-full flex items-center gap-4 p-4 bg-slate-50 hover:bg-slate-100 rounded-xl transition-all active:scale-[0.98]"
              >
                <div className="w-12 h-12 bg-white rounded-xl shadow-sm border border-slate-200 flex items-center justify-center">
                  <MapPin className="w-7 h-7 text-slate-600" />
                </div>
                <div className="text-left flex-1">
                  <div className="font-semibold text-slate-800">Apple / Google 地图</div>
                  <div className="text-sm text-slate-500">海外用户适用</div>
                </div>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Animation Styles */}
      <style>{`
        @keyframes slideUp {
          from {
            transform: translateY(100%);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
      `}</style>

    </div>
  );
};

export default App;